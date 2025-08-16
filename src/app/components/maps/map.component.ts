// map.component.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { bbox } from '@turf/turf';
import {
    YMapComponent,                     // <y-map>
    YMapDefaultSchemeLayerDirective,   // <y-map-default-scheme-layer>
    YMapDefaultFeaturesLayerDirective, // <y-map-default-features-layer>
    YMapDefaultMarkerDirective,
    YMapMarkerDirective,           // <y-map-zoom-control>
} from 'angular-yandex-maps-v3';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { MapSidebarComponent } from './components/map-sidebar/map-sidebar.component';
import { MapZoomControlComponent } from './components/map-zoom-control/map-zoom-control.component';
import { MapFullscreenComponent } from './components/map-fullscreen/map-fullscreen.component';
import { MapSettingsControlComponent } from './components/map-settings-control/map-settings-control.component';
import { MapService } from './services/map-service';
import { CitiesService, CityIndexItem } from '../cities/services/cities.service';
import { BehaviorSubject, catchError, combineLatest, debounceTime, delay, distinctUntilChanged, filter, forkJoin, map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { BBox, Feature } from 'geojson';
import { MapEventManager } from './services/map-event-manager';
import { YMapFeatureDirective } from './directives/y-map-feature.directive';
import { YMapFeatureDataSourceDirective } from './directives/y-map-feature-data-source.directive';
import { YMapLayerDirective } from './directives/y-map-layer.directive';
import { MapLegendControlComponent } from './components/map-legend-control/map-legend-control.component';
import { RoutesService } from '../routes/services/routes.service';
import { YMapClustererDirective } from './directives/y-map-clusterer.directive';
import { YMapLocationRequest } from '@yandex/ymaps3-types';
import { LayoutService } from '../../services/layout.service';
import { YMapMouseDirective } from './directives/y-map-mouse.directive';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ChipModule,
        SkeletonModule,
        MapSidebarComponent,
        MapZoomControlComponent,
        MapSettingsControlComponent,
        MapFullscreenComponent,
        YMapComponent,
        YMapDefaultSchemeLayerDirective,
        YMapDefaultFeaturesLayerDirective,
        YMapFeatureDataSourceDirective,
        YMapFeatureDirective,
        YMapLayerDirective,
        MapLegendControlComponent,
        YMapClustererDirective,
        YMapDefaultMarkerDirective,
        YMapMarkerDirective,
        YMapMouseDirective
    ],
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MapComponent {

    public center = signal<[number, number]>([61.402554, 55.159902]); // [lng,lat]
    public zoom = signal<number>(12);
    public theme = signal<'light' | 'dark'>('light');
    public bounds = signal<[[number, number], [number, number]]>([[-83.8, -170.8], [83.8, 170.8]]);
    public zoomRange = signal({ min: 5, max: 22 });

    public isMapLoad = false;
    public isCityBoundaries = false;
    private map?: any;
    public isVisible = false;
    public isVisibleSidebarBottom = false;
    public routeFeature: any;
    public markerFeatures: any;
    public features: any = [];
    public citiesFeatures: any | null = null;


    private _eventManager: MapEventManager = new MapEventManager(inject(NgZone));
    private _bounds = this._eventManager.getLazyEmitter<{ location: { bounds: any } }>('onUpdate');
    private zoom$ = new BehaviorSubject<number>(this.zoom());
    private bounds$ = new BehaviorSubject<BBox | null>(null);
    private _destroy$ = new Subject<boolean>();

    constructor(
        public cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        public mapService: MapService,
        private cities: CitiesService,
        public layoutService: LayoutService,
    ) {

        this.theme.set(this.layoutService.config().darkTheme ? 'dark' : 'light');
    }

    public onMapReady(ev: { entity: any; ymaps3: typeof ymaps3 }) {

        this.map = ev.entity;
        this.isMapLoad = true;
        this.mapService.load$.next(this.map);
        this._eventManager.setTarget(this.map);


        this._watchFoDarkThemeChanges();
        this._watchForBoundsChanges();
        this._watchVisiblePolygons();
        this._onBoundsChange();
        this._watchForCityDataChanges();
        this._watchForClusterDataChanges()
        this._watchForRouteDataChanges();
        this._watchFoRemoveChanges();
        this.cdr.detectChanges();

    }

    private _watchFoDarkThemeChanges(): void {
        this.layoutService.configUpdate$
            .pipe(
                tap(() => this.theme.set(this.layoutService.config().darkTheme ? 'dark' : 'light'))
            )
            .subscribe();
    }

    private _watchFoRemoveChanges(): void {

        this.mapService.remove$
            .pipe(
                tap((isRemove) => {
                    isRemove && this.removeMarkers();
                    isRemove && this.removeRoute();
                    isRemove && this.removeClusters();
                })
            )
            .subscribe()

    }

    private _watchForBoundsChanges(): void {
        this._bounds.pipe(
            map(e => e?.location?.bounds as [[number, number], [number, number]] | undefined),
            filter((b): b is [[number, number], [number, number]] => Array.isArray(b)),
            map(b => this.toBBox(b).map(x => +x.toFixed(5))),
            map(arr => arr.join('|')),
            distinctUntilChanged(),
            debounceTime(100),
        ).pipe(takeUntil(this._destroy$))
            .subscribe(() => this._onBoundsChange());
    }

    private _watchForCityDataChanges(): void {
        this.mapService.cityBoundaries$
            .pipe(distinctUntilChanged(), takeUntil(this._destroy$))
            .subscribe(show => {
                this.isCityBoundaries = show;
                this.cdr.detectChanges();
                if (show) {

                    this._onBoundsChange();
                } else {
                    this.remove();
                }
            });
    }

    private _watchForClusterDataChanges(): void {
        this.mapService.clusterData$
            .pipe(
                filter(Boolean),
                map((items: any[]) =>
                    items
                        .filter(i => Array.isArray(i.coordinates) && i.coordinates!.length === 2)
                        .map((i): any => ({
                            type: 'Feature',
                            id: String(i.id),
                            geometry: { type: 'Point', coordinates: i.coordinates as any },
                            properties: {
                                id: i.id,
                                order: i.order,
                                color: i.color,
                                durationText: i.durationText,
                                distanceText: i.distanceText,
                                startAddress: i.startAddress,
                                endAddress: i.endAddress,
                            },
                        }))
                )
            ).subscribe((data: any) => {
                this.features = data;
                const coords = this.features.map(f => f.geometry.coordinates);

                if (coords.length) {
                    const lons = coords.map(c => c[0]);
                    const lats = coords.map(c => c[1]);
                    const minLon = Math.min(...lons);
                    const maxLon = Math.max(...lons);
                    const minLat = Math.min(...lats);
                    const maxLat = Math.max(...lats);

                    const bounds: [[number, number], [number, number]] = [
                        [minLon, minLat],
                        [maxLon, maxLat],
                    ];

                    this.fitBounds(bounds);
                }
                this.cdr.detectChanges()
            });
    }

    private _watchForRouteDataChanges(): void {
        this.mapService.currentRoteData$
            .subscribe((fc: any) => {
                this.features = [];
                this.cdr.detectChanges();
                if (!fc?.features?.length) return;

                const line = fc.features.find(f => f.geometry?.type === 'LineString');
                const points = fc.features.filter(f => f.geometry?.type === 'Point');

                if (line) {
                    this.routeFeature = {
                        source: 'route',
                        id: String(line.id ?? line.properties?.id ?? 'route'),
                        geometry: line.geometry,
                        style: { stroke: [{ color: '#EB5547', width: 4 }] }
                    };
                } else {
                    this.routeFeature = undefined;
                }


                this.markerFeatures = points.map((p, idx) => ({
                    source: 'markers',
                    id: p.id ?? `marker-${idx}`,
                    geometry: p.geometry,
                    properties: p.properties,
                    style: {
                        icon: this.makeCircleIcon(
                            idx === 0 ? '#8BDE8C' : '#FF5757',
                            30,
                            '#fff',
                            2,
                            idx === 0 ? 'A' : 'B'
                        ),
                    }
                }));


                const allPts: [number, number][] = [];
                if (line?.geometry?.type === 'LineString') {
                    allPts.push(...(line.geometry.coordinates as [number, number][]));
                }
                for (const p of points) {
                    allPts.push(p.geometry.coordinates as [number, number]);
                }
                if (this.map && allPts.length) {
                    const bounds = this.boundsOf(allPts);
                    this.map.update({ location: { bounds, duration: 250 } as any }); // YMapBoundsLocation
                }


                this.cdr.detectChanges();
            });
    }


    private makeCircleIcon(
        color = '#ff3333',
        size = 18,
        stroke = '#fff',
        strokeWidth = 2,
        label?: string,
        labelColor = '#fff'
    ) {

        const r = size / 2;
        const fs = Math.round(size * 0.58);
        const safeLabel = (label ?? '').toString().trim().slice(0, 2).toUpperCase(); // 1–2 символа

        const svg =
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
            `<circle cx="${r}" cy="${r}" r="${r - strokeWidth / 2}" fill="${color}" stroke="${stroke}" stroke-width="${strokeWidth}"/>` +
            `<text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="${labelColor}" font-family="Arial, sans-serif" font-size="${fs}" font-weight="bold">${label}</text>` +
            `</svg>`;

        const url = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
        const icon = { url };
        return icon;
    }

    private boundsOf(points: [number, number][]) {
        let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
        for (const [lon, lat] of points) {
            if (lon < minLon) minLon = lon;
            if (lat < minLat) minLat = lat;
            if (lon > maxLon) maxLon = lon;
            if (lat > maxLat) maxLat = lat;
        }
        return [[minLon, minLat], [maxLon, maxLat]] as [[number, number], [number, number]];
    }

    public fitBounds(bounds) {
        this.map.update({ location: { bounds, ...{ easing: 'ease-in-out', duration: 600, } } });
    }

    private _onBoundsChange(): void {
        if (!this.map || !this.isCityBoundaries) return;
        this.bounds$.next(this.toBBox(this.map?.bounds));
        this.zoom$.next(this.map?.zoom);
    }

    public withAlpha = (hex: string, a: number) =>
        hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0').toUpperCase();

    private toBBox(b: [[number, number], [number, number]]): [number, number, number, number] {
        const west = b[0][0];
        const north = b[0][1];
        const east = b[1][0];
        const south = b[1][1];
        return [west, south, east, north]; // [minLon, minLat, maxLon, maxLat]
    }


    private featureId(feat: any, j: number): string {
        const gc = feat?.properties?.geocoding ?? {};
        if (gc?.place_id != null) return String(gc.place_id);
        if (gc?.osm_id != null && gc?.osm_type) return `${gc.osm_type}:${gc.osm_id}`;
        return `idx:${String(j)}`;
    }

    public remove() {
        this.citiesFeatures = [];
        this.cdr.detectChanges();
        return { type: 'FeatureCollection', features: [] };
    }

    public removeMarkers(): void {
        this.markerFeatures = [];
        this.cdr.markForCheck();
    }

    public removeRoute(): void {
        this.routeFeature = null;
        this.cdr.detectChanges();
    }

    public removeClusters(): void {
        this.features = [];
        this.cdr.detectChanges();
    }


    private _watchVisiblePolygons(): void {
        combineLatest([this.cities.findAll(), this.bounds$, this.zoom$]).pipe(
            debounceTime(150),
            switchMap(([list, bounds, zoom]) => {
                if (!bounds || zoom < 8) return of(this.remove());

                const visible = list.filter((c: CityIndexItem) => c.bbox && this._intersects(c.bbox!, bounds));
                if (!visible.length) return of(this.remove());

                return forkJoin(
                    visible.map(c =>
                        this.cities.getPolygon(String(c.label)).pipe(
                            catchError(() => of({ type: 'FeatureCollection', features: [] } as any))
                        )
                    )
                ).pipe(
                    map((fcs) => {
                        const features = fcs.flatMap((fc) =>
                            (fc.features ?? []).map((feat: any, j: number) => ({
                                ...feat,
                                id: this.featureId(feat, j),  
                                 style: {
                        stroke: [
                            { color: '#EB5547', width: 1 }
                        ],
                        fill: [
                           { color: 'rgba(225,132,131,0.5)' }
                        ]
                    }                   // ← ТОЛЬКО place_id (строка) + фолбэк
                            }))
                        );

                        // На всякий случай: дедуп и стабильный порядок (снимает insertBefore)
                        const uniq = new Map<string, any>();
                        for (const f of features) if (!uniq.has(f.id)) uniq.set(f.id, f);
                        const ordered = Array.from(uniq.values()).sort((a, b) => a.id.localeCompare(b.id));

                        return { type: 'FeatureCollection', features: ordered };
                    })
                );
            })
        )
            .subscribe((fc: any) => {
                this.citiesFeatures = (fc.features ?? []).map((feat: any) => ({
                    id: String(feat.id),              // гарантия строки
                    geometry: feat.geometry,
                    properties: feat.properties ?? {},
                   style: {stroke: [{color: '#E18483', width: 1.5, dash: [6, 4]}], fill: this.withAlpha('#E18483', 0.15)}
                }));
                this.cdr.markForCheck();
            });
    }

    private _intersects(a: BBox, b: BBox): boolean {
        const norm = ([w, s, e, n]: BBox): BBox => [
            Math.min(w, e),
            Math.min(s, n),
            Math.max(w, e),
            Math.max(s, n)
        ];

        const [ax1, ay1, ax2, ay2] = norm(a);
        const [bx1, by1, bx2, by2] = norm(b);

        return ax1 <= bx2 && ax2 >= bx1 && ay1 <= by2 && ay2 >= by1;
    }

    public onVisibleChangeSidebar(event: boolean) {
        this.isVisible = event;
    }

    public onChangeSettings(_: any): void {
        this.isVisible = !this.isVisible;
    }

    public onChangeSidebarBottom(event: boolean) {
        this.isVisibleSidebarBottom = event;
    }


    trackById = (_: number, f: any) => f.id;
    trackByMarkerId(index: number, marker: any): string {
        return marker.id;
    }
}
