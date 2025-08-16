import { Injectable, NgZone, OnDestroy } from '@angular/core';
// external lib
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { DeckProps, Layer } from '@deck.gl/core';
import { MapboxOverlay } from '@deck.gl/mapbox';

export type DeckL = Layer<{}>;

@Injectable()
export class DeckService implements OnDestroy {

    private _deck: MapboxOverlay | null = null;
    public layers: Map<Layer<any>, DeckL> = new Map<Layer<any>, DeckL>();
    public readonly _updateLayer$ = new BehaviorSubject<void>(undefined);

    constructor(private _zone: NgZone) { }

    public getDeck(): MapboxOverlay {
        if (!this._deck) {
            throw new Error('DeckService: GoogleMapsOverlay не инициализирован. Сначала вызови createLayer().');
        }
        return this._deck;
    }

    public getLayers(): DeckL[] {
        return [...this.layers.values()];
    }

    public createLayer(opts: DeckProps): Observable<void> {
        return new Observable((observer: Observer<void>) => {
            this._zone.runOutsideAngular(() => {
                this._deck = new MapboxOverlay({
                    ...opts,
                    interleaved: true,
                    layers: []
                });;
            });
            observer.next();
            observer.complete();
        });
    }

    public addLayer(layer: any, el: DeckL): void {
        this.layers.set(layer, el);
        this._updateLayer$.next();
    }

    public removeLayer(layer: any, update: boolean = false): void {
        if (this.layers.has(layer)) {
            this.layers.delete(layer);
            if (update) {
                this._updateLayer$.next();
            }
        }
    }

    public ngOnDestroy(): void {
        this._updateLayer$.complete();
        this.layers.clear();
        if (this._deck) {
            this._deck.finalize();
            this._deck = null;
        }
    }

}