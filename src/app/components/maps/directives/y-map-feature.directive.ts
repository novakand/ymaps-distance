import { Directive, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, inject, NgZone } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import type { YMapFeatureProps } from '@yandex/ymaps3-types';
import { YMapComponent, YReadyEvent } from 'angular-yandex-maps-v3';

declare const ymaps3: any;

@Directive({
    selector: 'y-map-feature',
    standalone: true
})
export class YMapFeatureDirective implements OnInit, OnDestroy, OnChanges {
    private readonly ngZone = inject(NgZone);
    private readonly yMapComponent = inject<YMapComponent>(YMapComponent);
    private map?: any;

    private readonly destroy$ = new Subject<void>();

    private feature?: any;

    @Input({ required: true }) props!: YMapFeatureProps;

    @Output() ready = new EventEmitter<YReadyEvent<any>>();

    ngOnInit() {
        this.yMapComponent.map$
            .pipe(filter(Boolean), takeUntil(this.destroy$))
            .subscribe((map) => {
                this.map = map;
                this.ngZone.runOutsideAngular(() => {
                    this.feature = new ymaps3.YMapFeature(this.props);
                    this.map.addChild(this.feature);
                    this.ready.emit({ ymaps3, entity: this.feature });
                });
            });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['props']?.currentValue && this.feature) {
            this.ngZone.runOutsideAngular(() => {
                this.feature?.update(changes['props'].currentValue);
            });
        }
    }

    ngOnDestroy() {
        this.ngZone.runOutsideAngular(() => {
            try {
                if (this.feature && this.map) {
                    this.map.removeChild(this.feature);
                }
            } catch {  }
            this.feature = undefined;
        });

        this.destroy$.next();
        this.destroy$.complete();
    }
}
