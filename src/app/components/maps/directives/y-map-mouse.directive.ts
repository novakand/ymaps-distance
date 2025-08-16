import { Directive, ElementRef, Input, OnInit, OnDestroy, NgZone, inject } from '@angular/core';
import { YMapComponent } from 'angular-yandex-maps-v3';
import { Subject, debounceTime, distinctUntilChanged, filter, takeUntil, tap } from 'rxjs';
import { MapEventManager } from '../services/map-event-manager';

type YMap = any;

@Directive({
    selector: 'y-map-mouse'
})
export class YMapMouseDirective implements OnInit, OnDestroy {
    private readonly zone = inject(NgZone);
    private readonly yMapComponent = inject<YMapComponent>(YMapComponent);
    private _eventManager: MapEventManager = new MapEventManager(inject(NgZone));
    private mousemove = this._eventManager.getLazyEmitter<any>('onMouseMove');
    private mousedown = this._eventManager.getLazyEmitter<any>('onMouseDown');
    private map?: YMap;
    private destroy$ = new Subject<void>();

    private isRotating = false;
    private startPos = { x: 0, y: 0 };
    private startAzimuth = 0;
    private startTilt = 0;

    ngOnInit(): void {
        this.yMapComponent.map$
            .pipe(filter((m): m is YMap => !!m), takeUntil(this.destroy$))
            .subscribe((map) => {
                this.map = map;
                this._eventManager.setTarget(this.map);
                this._setupMouseEvents();
            });
    }

    private _setupMouseEvents(): void {
        if (!this.map) return;

        const container = this.map.container;
        container.addEventListener('contextmenu', (e) => e.preventDefault());


        const MAX_TILT = 70 * Math.PI / 180;

        container.addEventListener('mousedown', (e) => {
            if (e.button === 2) {
                this.isRotating = true;
                this.startPos = { x: e.clientX, y: e.clientY };
                this.startAzimuth = this.map?.azimuth || 0;
                this.startTilt = this.map?.tilt || 0;
                container.style.cursor = 'grab';
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.isRotating || !this.map) return;

            const dx = e.clientX - this.startPos.x;
            const dy = e.clientY - this.startPos.y;

            const rotationSensitivity = 0.5;
            const tiltSensitivity = 0.3;

            const newAzimuth = this.startAzimuth - dx * rotationSensitivity * Math.PI / 180;

            const newTilt = Math.max(
                10 * Math.PI / 180,
                Math.min(
                    MAX_TILT,
                    this.startTilt + dy * tiltSensitivity * Math.PI / 180
                )
            );

            this.zone.runOutsideAngular(() => {
                this.map?.update({
                    camera: {
                        azimuth: newAzimuth,
                        tilt: newTilt,
                        duration: 0
                    }
                });
            });
        });

        document.addEventListener('mouseup', () => {
            if (this.isRotating) {
                this.isRotating = false;
                if (this.map) {
                    this.map.container.style.cursor = '';
                }
            }
        });
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}