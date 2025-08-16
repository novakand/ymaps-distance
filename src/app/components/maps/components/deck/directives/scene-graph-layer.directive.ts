import { Directive, inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, skip, Subject, take, takeUntil } from 'rxjs';
import { DeckService } from '../services/deck.service';
import { deepEquals } from '@primeuix/utils';
import { ScenegraphLayer, ScenegraphLayerProps } from '@deck.gl/mesh-layers';

@Directive({
    selector: 'scene-graph-layer',
    standalone: true
})
export class ScenegraphLayerDirective implements OnInit, OnDestroy {

    private readonly _options = new BehaviorSubject<any>({});
    private readonly _data = new BehaviorSubject<GeoJSON.FeatureCollection | undefined>(undefined);
    private readonly _visible = new BehaviorSubject<boolean>(true);
    private readonly _destroy$ = new Subject<void>();

    @Input()
    set visible(visible: boolean) {
        this._visible.next(visible);
    }

    @Input()
    set data(data: GeoJSON.FeatureCollection) {
        this._data.next(data || {});
    }

    @Input()
    set options(options: ScenegraphLayerProps<{}>) {
        this._options.next(options || {});
    }

    @Output() public layerClick: Subject<{ info: any; event: any }> = new Subject();
    @Output() public layerHover: Subject<{ info: any; event: any }> = new Subject();

    public layer?: ScenegraphLayer<{}>;

    private static layerCounter = 0;

    private readonly _id: string = (ScenegraphLayerDirective.layerCounter++).toString();

    constructor(
        private readonly _deckService: DeckService,
        private readonly _ngZone: NgZone,
    ) { }

    public ngOnInit(): void {
        this._onInit();
    }

    public ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
        this._deckService.removeLayer(this, true);
    }

    private _onInit(): void {
        this._combineOptions()
            .pipe(take(1))
            .subscribe(options => {
                this._ngZone.runOutsideAngular(() => {
                    this.layer = new ScenegraphLayer(options);
                    this._assertInitialized();
                    this._deckService.addLayer(this, this.layer);
                    this._watchForCombinedChanges();
                });
            });
    }

    private _updateLayer(opts: ScenegraphLayerProps<{}>): void {
        if (this.layer) {
            this._deckService.removeLayer(this);
            this.layer = undefined;
        }

        this.layer = new ScenegraphLayer(opts);
        this._deckService.addLayer(this, this.layer);
    }

    private _combineOptions(): Observable<ScenegraphLayerProps<{}>> {
        return combineLatest([this._options, this._data, this._visible]).pipe(
            map(([options, data, visible]) => {
                const combinedOptions: ScenegraphLayerProps<{}> = {
                    ...options,
                    data: data || options?.data,
                    visible: visible !== undefined ? visible : options.visible,
                    onClick: (info: any, event: any) => this.layerClick.next({ info, event }),
                    onHover: (info: any, event: any) => this.layerHover.next({ info, event }),
                };
                return combinedOptions;
            }),
        );
    }

    private _watchForCombinedChanges(): void {
        this._combineOptions()
          .pipe(
            skip(1),
            distinctUntilChanged((prev, curr) => deepEquals(prev, curr)), 
            takeUntil(this._destroy$)
          )
          .subscribe(options => {
            this._assertInitialized();
            this._updateLayer(options);
          });
      }

    private _assertInitialized(): asserts this is { layer: ScenegraphLayer<{}> } {
        if (!this.layer) {
            throw new Error(
                'Cannot interact with a Deck GL ScenegraphLayer Layer before it has been initialized.'
            );
        }
    }

}
