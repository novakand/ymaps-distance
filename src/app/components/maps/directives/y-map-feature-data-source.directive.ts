import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  inject,
  NgZone,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import type { YMap, YMapFeatureDataSourceProps } from '@yandex/ymaps3-types';
import { YMapComponent, YReadyEvent } from 'angular-yandex-maps-v3';

declare const ymaps3: any;

@Directive({
  selector: 'y-map-feature-data-source',
  standalone: true,
})
export class YMapFeatureDataSourceDirective implements OnInit, OnDestroy, OnChanges {
  private readonly ngZone = inject(NgZone);
  private readonly yMapComponent = inject<YMapComponent>(YMapComponent);

  private readonly destroy$ = new Subject<void>();

  private source?: any 
  private map?: YMap;

 
  @Input({ required: true }) props!: YMapFeatureDataSourceProps;

  @Output() ready: EventEmitter<YReadyEvent<any>> = new EventEmitter();

  public ngOnInit() {
    this.yMapComponent.map$
      .pipe(
        filter((m): m is YMap => !!m),
        takeUntil(this.destroy$)
      )
      .subscribe((map) => {
        this.map = map;
        this.ngZone.runOutsideAngular(() => {
          this.source = new ymaps3.YMapFeatureDataSource(this.props);
          this.map!.addChild(this.source);
          this.ready.emit({ ymaps3, entity: this.source });
        });
      });
  }

  public ngOnChanges(changes: SimpleChanges) {
    const next = changes['props']?.currentValue;
    if (next && this.source) {
      this.ngZone.runOutsideAngular(() => {
        this.source.update(next);
      });
    }
  }

  public ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      try {
        if (this.source && this.map) {
          this.map.removeChild(this.source);
        }
      } catch {
        
      }
      this.source = undefined;
    });

    this.destroy$.next();
    this.destroy$.complete();
  }
}
