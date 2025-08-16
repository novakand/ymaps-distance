import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, debounceTime, delay, EMPTY, filter, map, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { RoutesService } from '../../services/routes.service';
import { Input as RouterInput } from '@angular/core'
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { DatePicker } from 'primeng/datepicker';
import { TimelineModule } from 'primeng/timeline';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapService } from '../../../maps/services/map-service';
import { LoadProgressService } from '../../../../services/load-progress.service';
import { IPointInfo } from '../../interfaces/point-info.interface';
import { MsToKmhPipe } from '../../../../pipes/ms-to-km.pipe';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { SafeDatePipe } from '../../../../pipes/safe-date.pipe';
import { ConfirmationService } from 'primeng/api';
import { LayoutService } from '../../../../services/layout.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'app-vehicle-detail',
    templateUrl: './route-detail.component.html',
    styleUrls: ['./route-detail.component.scss'],
    imports: [
        CommonModule,
        DrawerModule,
        ButtonModule,
        ToggleSwitchModule,
        DatePicker,
        TimelineModule,
        FormsModule,
        ReactiveFormsModule,
        MsToKmhPipe,
        TranslateModule
    ],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteDetailComponent implements OnInit, OnDestroy {

    @RouterInput() id!: string;

    private _isMapSidebar = signal(true);
    public isVisibleRoute = false;
    public form: FormGroup;
    public data: any = {

    };
    public isSmallScreen: boolean;
    public isLargeScreen: boolean;
    public item: any;
    public isVisible = true;

    public points = [{ name: '-', coordinates: [], icon: 'from', type: 'loading' }, { name: '-', coordinates: [], icon: 'to', type: 'unloading' }];

    private _getTrack$ = new Subject<any>();
    private _destroy$ = new Subject<boolean>();

    constructor(
        private _fb: FormBuilder,
        private _cdr: ChangeDetectorRef,
        private routeService: RoutesService,
        private router: Router,
        private _vehicleService: RoutesService,
        private _loadProgressService: LoadProgressService,
        public mapService: MapService,
        private breakpointObserver: BreakpointObserver,
        private confirmationService: ConfirmationService,
        public layoutService: LayoutService,

    ) {
        this.data = {
            timestamp: '–',
            latitude: null,
            longitude: null,
            altitude: null,
            speed: null
        };
        this._buildForm();
        this._watchForFormValueChanges();
        this._watchForIsRepeatChanges();

        this.breakpointObserver
            .observe(['(min-width: 992px)', '(max-width: 767px)'])
            .pipe(delay(100))
            .subscribe((state: BreakpointState) => {
                this.isLargeScreen = state.breakpoints['(min-width: 992px)'];
                this.isSmallScreen = state.breakpoints['(max-width: 767px)'];
                this._cdr.detectChanges();
            });
    }

    public onClose() {
        this.isVisible = false;
        this.onHide();
        this._cdr.markForCheck();
    }

    public toggleSideBar(): void {
        this.layoutService.toggleSideBar();

    }

    public isMapSidebar = computed(() => this._isMapSidebar());

    public containerClass = computed(() => {
        return {
            'sidebar-active': this.isMapSidebar(),
        };
    });


    private _watchForFormValueChanges() {
        this.form.valueChanges
            .pipe(
                filter(() => this.form.valid),
                debounceTime(600),
                tap(() => this._getTrack$.next(this.form.value))
            )
            .subscribe()
    }


    private _watchForIsRepeatChanges(): void {
        this.form.get('isRepeat')!
            .valueChanges
            .pipe(
                takeUntil(this._destroy$),
            )
            .subscribe(isRepeat => {
                const startCtrl = this.form.get('start')!;
                const endCtrl = this.form.get('end')!;

                if (isRepeat) {
                    startCtrl.disable({ emitEvent: false });
                    endCtrl.disable({ emitEvent: false });
                } else {
                    startCtrl.enable({ emitEvent: false });
                    endCtrl.enable({ emitEvent: false });
                }

            });
    }

    public ngOnInit() {
        this.getById();
        this._getTrack$.next(null)

    }

    public getById() {
        this.routeService.getById(this.id)
            .pipe(
            )
            .subscribe(data => {

                const p = data?.features?.[0]?.properties ?? {};
                this.item = p;
                this.points[0].name = (p?.start?.addressComponent?.address ?? '');
                this.points[0].coordinates = p?.start?.coordinates?.reverse();
                this.points[1].name = (p?.end?.addressComponent?.address ?? '');
                this.points[1].coordinates = p?.end?.coordinates?.reverse();
                this.mapService.currentRoteData$.next(data);
                this._cdr.markForCheck();

            })
    }

    public onHide() {
        this.router.navigate(['/']);
        this.data = {
            timestamp: '–',
            latitude: null,
            longitude: null,
            altitude: null,
            speed: null
        };
        this._cdr.markForCheck();
        this._cdr.detectChanges();
    }

    public ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.complete();
        this.mapService.remove$.next(true);
        this.data = {
            timestamp: '–',
            latitude: null,
            longitude: null,
            altitude: null,
            speed: null
        };
        this._cdr.markForCheck();

    }

    public onRoutes(): void {
        this.isVisibleRoute = !this.isVisibleRoute;
    }

    private _buildForm(): void {
        const now = new Date();
        const midnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            0, 0, 0, 0
        );

        this.form = this._fb.group({
            start: [{ value: midnight, disabled: true }, [Validators.required]],
            end: [{ value: now, disabled: true }, [Validators.required]],
            isRepeat: [true, [Validators.required]],
        });
    }

}
