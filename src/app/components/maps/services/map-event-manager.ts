

import { NgZone } from '@angular/core';
import { YMapListener, YMapListenerProps } from '@yandex/ymaps3-types';
import { BehaviorSubject, Observable, Subject, Subscriber, Subscription } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

export class MapEventManager {
    private _listeners = new Map<string, YMapListener>();
    private _targetStream = new BehaviorSubject<any>(null);
    private _destroy$ = new Subject<void>();
    private _subscriptions: Subscription[] = [];

    constructor(private _ngZone: NgZone) {}

    private _clearListeners() {
        this._ngZone.runOutsideAngular(() => {
            this._listeners.forEach(listener => {
                listener.update({});
            });
        });
        this._listeners.clear();
        this._subscriptions.forEach(sub => sub.unsubscribe());
        this._subscriptions = [];
    }

    getLazyEmitter<T>(eventName: string): Observable<T> {
        return this._targetStream.pipe(
            filter(Boolean),
            switchMap(target => {
                return new Observable<T>(observer => {
                    const listener = new ymaps3.YMapListener({
                        [eventName]: (event: T) => {
                            this._ngZone.run(() => observer.next(event));
                        }
                    });

                    this._ngZone.runOutsideAngular(() => {
                        target.addChild(listener);
                    });

                    this._listeners.set(eventName, listener);

                    return () => {
                        this._ngZone.runOutsideAngular(() => {
                            listener.update({});
                            this._listeners.delete(eventName);
                        });
                    };
                });
            }),
            takeUntil(this._destroy$)
        );
    }

    public setListeners(props: YMapListenerProps): void {
        this._ngZone.runOutsideAngular(() => {
            this._listeners.forEach(listener => {
                listener.update(props);
            });
        });
    }

    public off(eventName: string): void {
        this._ngZone.runOutsideAngular(() => {
            const listener = this._listeners.get(eventName);
            if (listener) {
                listener.update({});
                this._listeners.delete(eventName);
            }
        });
    }

    public setTarget(target: any): void {
        const currentTarget = this._targetStream.value;
        if (target === currentTarget) return;

        this._clearListeners();
        this._targetStream.next(target);
    }

    public destroy(): void {
        this._clearListeners();
        this._destroy$.next();
        this._destroy$.complete();
        this._targetStream.complete();
    }
}