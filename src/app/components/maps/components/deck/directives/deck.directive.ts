import { Directive, inject, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, filter, takeUntil } from 'rxjs/operators';
import { DeckService } from '../services/deck.service';
import { deepEquals } from '@primeuix/utils';
import { DeckProps } from '@deck.gl/core';
import { MapComponent } from 'ngx-mapbox-gl';
let layerCounter = 0;

@Directive({
    selector: 'deck',
    standalone: true,
    providers: [DeckService]
})
export class DeckDirective implements OnInit, OnChanges, OnDestroy {

    @Input() public options: DeckProps;
    @Output() public deckViewStateChange: Subject<any> = new Subject();
    @Output() public deckWebGLInitialized: Subject<WebGLRenderingContext> = new Subject();
    @Output() public deckHover: Subject<{ info: any; event: MouseEvent }> = new Subject();
    @Output() public deckClick: Subject<{ info: any; event: any }> = new Subject();
    @Output() public deckLoad: Subject<void> = new Subject();
    @Output() public deckResize: Subject<{ height: number; width: number }> = new Subject();
    @Output() public deckBeforeRender: Subject<{ gl: WebGLRenderingContext }> = new Subject();
    @Output() public deckAfterRender: Subject<{ gl: WebGLRenderingContext }> = new Subject();
    @Output() public deckError: Subject<{ error: Error; source: any }> = new Subject();

    public deck?: any;

    private readonly _map: MapComponent = inject(MapComponent);
    public readonly map: any;
    private readonly _destroy$ = new Subject<boolean>();
    private readonly _id: string;

    constructor(
        private readonly _deckService: DeckService
    ) {
        this._id = (layerCounter++).toString();
        this._watchForLoadChanges();
    }

    public ngOnInit(): void { }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['options'] && !changes['options'].isFirstChange()) {
            const prevOptions = changes['options'].previousValue;
            const currOptions = changes['options'].currentValue;

            if (deepEquals(prevOptions, currOptions)) {
                return;
            }

            if (!this.deck) {
                console.warn(`DeckDirective[${this._id}]: Deck not initialized. Ignoring changes.`);
                return;
            }

            this.deck.setProps(this._combineOptions());
        }
    }

    public ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.complete();

        if (!this.deck) return;

        this.map?.removeControl(this.deck);
        this.deck.finalize();
    }

    private _watchForLoadChanges(): void {
        this._map.mapLoad
            .pipe(
                delay(1000),
                filter(Boolean),
                takeUntil(this._destroy$))
            .subscribe((map: any) => {
                const { target } = map || {};
                this._onInit(target);
                this._layersChanges();
            });
    }

    private _onInit(map: any): void {
        this._deckService.createLayer(this._combineOptions()).subscribe(() => {
            this.deck = this._deckService.getDeck();
            if (!this.deck) {
                return;
            }
            this._assertInitialized();
            map?.addControl(this.deck);
        });
    }

    private _combineOptions(): DeckProps {
        return {
            ...this.options,
            id: `canvas${this._id}` || this.options.id,
            controller: false,
            onClick: (info, event) => this.deckClick.next({ info, event }),
            onHover: (info, event: any) => this.deckHover.next({ info, event }),
            onResize: (size) => this.deckResize.next(size),
            onBeforeRender: (args) => this.deckBeforeRender.next(args),
            onAfterRender: (args) => this.deckAfterRender.next(args),
            onError: (error, source) => this.deckError.next({ error, source }),
            onLoad: () => this.deckLoad.next(),
            onViewStateChange: (args) => this.deckViewStateChange.next(args),
            onWebGLInitialized: (gl) => this.deckWebGLInitialized.next(gl),
        };
    }

    private _layersChanges(): void {
        this._deckService._updateLayer$
            .pipe(
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this.deck.setProps({ layers: [...this._deckService.getLayers()] });
            });
    }

    private _assertInitialized(): void {
        if (!this.deck) throw new Error(`DeckDirective[${this._id}]: Deck is not initialized.`);
    }
}