import {
  Directive,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import type { YMap, YMapLayer as TYMapLayer, YMapLayerProps } from '@yandex/ymaps3-types';
import { YMapComponent, YReadyEvent } from 'angular-yandex-maps-v3';


declare const ymaps3: any;

@Directive({
  selector: 'y-map-layer',
  standalone: true,
})
export class YMapLayerDirective implements OnInit, OnDestroy, OnChanges {
  private readonly ngZone = inject(NgZone);
  private readonly yMapComponent = inject<YMapComponent>(YMapComponent);

  private readonly destroy$ = new Subject<void>();

  private map?: YMap;
  private layer?: TYMapLayer;

  @Input({ required: true }) props!: YMapLayerProps;

  @Output() ready: EventEmitter<YReadyEvent<TYMapLayer>> = new EventEmitter();

  public ngOnInit() {
    this.yMapComponent.map$
      .pipe(filter((m): m is YMap => !!m), takeUntil(this.destroy$))
      .subscribe((map) => {
        this.map = map;
        this.ngZone.runOutsideAngular(() => {
          this.layer = new ymaps3.YMapLayer(this.props);
          this.map!.addChild(this.layer!);
          this.ready.emit({ ymaps3, entity: this.layer! });
        });
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    const next = changes['props']?.currentValue;
    if (next && this.layer) {
      this.ngZone.runOutsideAngular(() => {
        this.layer!.update(next);
      });
    }
  }

  public ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      try {
        if (this.layer && this.map) {
          this.map.removeChild(this.layer);
        }
      } catch {
      }
      this.layer = undefined;
    });

    this.destroy$.next();
    this.destroy$.complete();
  }
}
