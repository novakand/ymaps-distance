import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Subject, takeUntil, throttleTime } from 'rxjs';
import { MapService } from '../../services/map-service';
import { MapEventManager } from '../../services/map-event-manager';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'map-zoom-control',
    templateUrl: './map-zoom-control.component.html',
    styleUrls: ['./map-zoom-control.component.scss'],
    imports: [CommonModule, ButtonModule, TooltipModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapZoomControlComponent implements OnDestroy, OnInit {
    public isDisabled = false;
    private _map?: any;
    private _destroy$ = new Subject<boolean>();
    private _eventManager: MapEventManager = new MapEventManager(inject(NgZone));
    private _zoom = this._eventManager.getLazyEmitter<{ location: { zoom: number } }>('onUpdate');
    @Input() public isShowZoomControl = true;
    @Input() public isDisableZoomControl = false;
    @Input() public isResetZoomControl = true;
    @Input() public isDisabledZoomOut = false;
    @Input() public isDisabledZoomIn = false;
    @Input() public tooltipZoomIn = 'Приблизить';
    @Input() public tooltipZoomOut = 'Отдалить';

    constructor(
        private _mapService: MapService,
        private _cdr: ChangeDetectorRef,
    ) {
        this._watchForLoadChanges();
    }

    ngOnInit(): void { }

      public ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.complete();
        this._eventManager.destroy();
    }


    private _watchForZoomChanges(): void {
        this._zoom.pipe(
            distinctUntilChanged((prev, curr) => prev.location.zoom === curr.location.zoom),
            debounceTime(100),
            takeUntil(this._destroy$)
        ).subscribe(() => {
            this._onZoomChange();
        });
    }

    public onZoomOutChange(): void {
        if (!this._map) return;
        this._map.update({ location: { zoom: this._map.zoom - 1,duration:600 } });
    }

    public onZoomInChange(): void {
        if (!this._map) return;
        this._map.update({ location: { zoom: this._map.zoom + 1,duration:600 } });
    }

    private _watchForLoadChanges() {
        this._mapService.load$
            .pipe(
                filter(Boolean),
                takeUntil(this._destroy$),
            )
            .subscribe((mapInstance: any) => {
                this._map = mapInstance;
                this._eventManager.setTarget(this._map);
                this._watchForZoomChanges();


            });
    }

    private _onZoomChange(): void {
        if (!this._map) return;
        const zoom = this._map?.zoom ?? 0;
        const minZoom = this._map?.zoomRange.min ?? 0;
        const maxZoom = this._map?.zoomRange.max ?? 23;
        this.isDisabledZoomIn = zoom >= maxZoom;
        this.isDisabledZoomOut = zoom <= minZoom;
        this._cdr.detectChanges();
    }
}

