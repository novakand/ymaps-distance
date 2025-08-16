import {
    AfterContentInit,
    ContentChild,
    Directive,
    EventEmitter,
    inject,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
    EmbeddedViewRef,
} from '@angular/core';
import type { LngLat } from '@yandex/ymaps3-types/common/types';
import {
    Feature,
    YMapClustererProps,
} from '@yandex/ymaps3-types/packages/clusterer';
import { YMapComponent, YReadyEvent } from 'angular-yandex-maps-v3';
import { from, Subject } from 'rxjs';
import { delay, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;

@Directive({
    selector: 'y-map-clusterer',
    standalone: true,
})


export class YMapClustererDirective implements AfterContentInit, OnDestroy, OnChanges {

    private readonly ngZone = inject(NgZone);
    private readonly yMapComponent = inject(YMapComponent);

    @ContentChild('marker') markerTemplate?: TemplateRef<{ $implicit: Feature }>;
    @ContentChild('cluster') clusterTemplate?: TemplateRef<{ $implicit: { coordinates: LngLat; features: Feature[] } }>;

    private readonly destroy$ = new Subject<void>();

    private clusterer?: any;
    private map?: any;
    private createdViews = new Set<EmbeddedViewRef<any>>();

    @Input({ required: true }) props!: Optional<YMapClustererProps, 'marker' | 'cluster' | 'method'>;
    @Input() gridSize = 100;
    @Input() method?: YMapClustererProps['method'];
    @Output() ready = new EventEmitter<YReadyEvent<any>>();

    public ngAfterContentInit() {
        this.yMapComponent.map$
            .pipe(
                filter(Boolean),
                switchMap((map) =>
                    from(ymaps3.import('@yandex/ymaps3-clusterer@0.0.1'))
                        .pipe(
                            tap(({ YMapClusterer, clusterByGrid }) => {

                                const marker = (feature: Feature) => {
                                    const element = this.getTemplateElement(this.markerTemplate, feature);
                                    return new ymaps3.YMapMarker(
                                        {
                                            coordinates: feature.geometry.coordinates,
                                        },
                                        element,
                                    );
                                };

                                const cluster = (coordinates: LngLat, features: Feature[]) => {
                                    const element = this.getTemplateElement(this.clusterTemplate, {
                                        coordinates,
                                        features,
                                    });

                                    return new ymaps3.YMapMarker(
                                        {
                                            coordinates,
                                        },
                                        element,
                                    );
                                };
                                this.clusterer = new YMapClusterer({
                                    marker,
                                    cluster,
                                    method: clusterByGrid({ gridSize: 64 }),
                                    ...this.props,
                                });

                                map.addChild(this.clusterer);
                                this.ready.emit({ ymaps3, entity: this.clusterer });
                            }),
                        ),
                ),
                takeUntil(this.destroy$),
            )
            .subscribe();
    }


    public ngOnChanges(changes: SimpleChanges) {
        if (!this.clusterer) return;

        this.ngZone.runOutsideAngular(async () => {
            let next = { ...(changes['props']?.currentValue || {}) } as YMapClustererProps;

            if (changes['gridSize'] && !this.method && !next.method) {
                const { clusterByGrid } = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
                next = { ...next, method: clusterByGrid({ gridSize: this.gridSize ?? 64 }) };
            }
            if (changes['method'] && this.method) {
                next = { ...next, method: this.method };
            }

            try {
                this.clusterer!.update(next);
            } catch {

            }
        });
    }

    public ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            try {
                if (this.clusterer && this.map) {
                    this.map.removeChild(this.clusterer);
                }
            } catch { }
            this.clusterer = undefined;
            this.map = undefined;

            for (const view of this.createdViews) {
                try { view.destroy(); } catch { }
            }
            this.createdViews.clear();
        });

        this.destroy$.next();
        this.destroy$.complete();
    }

    private getTemplateElement(
        templateRef: TemplateRef<unknown> | undefined,
        context: unknown,
    ): HTMLElement {
        if (!templateRef) {
            throw new Error('TemplateRef cannot be undefined. It must be projected to the component.');
        }

        const view = templateRef.createEmbeddedView({ $implicit: context });

        view.detectChanges();
        const element = view.rootNodes[0];

        if (!element) {
            throw new Error('TemplateRef cannot be empty. It must contain a node.');
        }

        return element;
    }

}
