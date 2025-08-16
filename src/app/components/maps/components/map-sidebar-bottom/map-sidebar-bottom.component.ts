import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MapService } from '../../services/map-service';
import { debounceTime, delay, filter, Subject, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipOverflowDirective } from '../../../../directives/tooltip-overflow.directive';
import { TranslateModule } from '@ngx-translate/core';
@Component({
    selector: 'map-sidebar-bottom',
    templateUrl: './map-sidebar-bottom.component.html',
    styleUrls: ['./map-sidebar-bottom.component.scss'],
    imports: [
        CommonModule,
        ToggleButtonModule,
        SliderModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        DrawerModule,
        MultiSelectModule,
        FloatLabelModule,
        CascadeSelectModule,
        SelectButtonModule,
        ToggleSwitchModule,
        TooltipModule,
        TooltipOverflowDirective,
        TranslateModule
    ],
    providers: [DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MapSidebarBottomComponent implements OnDestroy, OnInit {
    @Input() public isVisible = true;
    @Input() public isVisibleButton = true;
    @Input() public timeline = 0;
    @Input() public trackLength = 0;
    @Input() public trackTimestamps: string[] = [];
    @Input() public isPlaying = false;
    @Output() public visibleChange: Subject<boolean> = new Subject<boolean>();
    @Output() public layerChange = new EventEmitter<{ code: string; visible: boolean }>();
    @Output() public timelineChange = new EventEmitter<number>();
    @Output() public speedMultiplierChange = new EventEmitter<number>();
    @Output() public playStateChange = new EventEmitter<boolean>();
    @Output() public autoPanChange = new EventEmitter<boolean>();

    public form: FormGroup;
    public state: any[] = [];
    public style: string;

    public data: any;

    public options: any;
    public speedMultiplierOptions = [
        { label: 'x1', value: 1 },
        { label: 'x4', value: 4 },
        { label: 'x12', value: 12 },
    ];

    private _map: any;
    private _destroy$ = new Subject<boolean>();

    constructor(
        private _fb: FormBuilder,
        private _mapService: MapService,
        private _cdr: ChangeDetectorRef,
        private datePipe: DatePipe
    ) {
    }

    public ngOnInit(): void {
        this._buildForm();
        this._watchForLoadChanges();
        this._watchForTrackChanges();
        this._watchForWaypointsChanges();
        this._watchForTimelineChanges();
        this._watchForSpeedMultiplierChanges();
        this._watchForisPlayingChanges();
        this._watchForisAutoPanChanges();
        this.form.disable();
    }


    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['timeline'] && !changes['timeline'].firstChange) {
            this.form.get('timeline')!
                .setValue(changes['timeline'].currentValue, { emitEvent: false });
        }
        if (changes['isPlaying'] && !changes['isPlaying'].firstChange) {
            this.form.get('isPlaying')!
                .setValue(changes['isPlaying'].currentValue, { emitEvent: false });
        }

        if (changes['trackLength'] && !changes['trackLength'].firstChange) {
            this.updateFormState();
        }

        if (changes['isVisible'] && !changes['isVisible'].firstChange) {

            this.isVisible = changes['isVisible'].currentValue;
        }

        if (changes['isVisibleButton'] && !changes['isVisibleButton'].firstChange) {
            this.isVisibleButton = changes['isVisibleButton'].currentValue;
        }
    }

    public ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.complete();
    }

private updateFormState(): void {
    if (this.trackLength > 0) {
      this.form.enable({ emitEvent: false });
    } else {
      this.form.disable({ emitEvent: false });
    }
  }

   public getTimestampTooltip(idx: number): string {
    if (!this.trackTimestamps?.length) {
      return '';
    }
    if (idx < 0) {
      idx = 0;
    } else if (idx >= this.trackTimestamps.length) {
      idx = this.trackTimestamps.length - 1;
    }

    const iso = this.trackTimestamps[idx];
    if (!iso) {
      return '';
    }

    const dt = new Date(iso);
    if (isNaN(dt.getTime())) {
      return iso;
    }
    return this.datePipe.transform(dt, 'dd MMMM yyyy, HH:mm:ss')!;
  }

    public toggle(): void {
        this.isVisible = !this.isVisible;
    }

    public onVisibleChange(visible: boolean): void {
        this.isVisible = visible;
    }


    public onClose(): void {
        this.isVisible = false;
        this.visibleChange.next(this.isVisible);
    }

    private _watchForTrackChanges() {
        this.form?.get('track')!
            .valueChanges
            .pipe(
                debounceTime(400),
                takeUntil(this._destroy$)
            )
            .subscribe((visible: boolean) => {
                this.layerChange.emit({ code: 'track-path-layer', visible });
            });
    }

    private _watchForWaypointsChanges() {
        this.form?.get('waypoints')!
            .valueChanges
            .pipe(
                debounceTime(400),
                takeUntil(this._destroy$)
            )
            .subscribe((visible: boolean) => {
                this.layerChange.emit({ code: 'track-points-full-layer', visible });
            });
    }


    private _watchForTimelineChanges() {
        this.form?.get('timeline')!
            .valueChanges
            .pipe(
                debounceTime(400),
                takeUntil(this._destroy$)
            )
            .subscribe((value: number) => {
                this.timelineChange.emit(value);
            });
    }


    private _watchForSpeedMultiplierChanges() {
        this.form?.get('speedMultiplier')!
            .valueChanges
            .pipe(
                debounceTime(400),
                takeUntil(this._destroy$)
            )
            .subscribe((value: number) => {
                this.speedMultiplierChange.emit(value);
            });
    }


    private _watchForisPlayingChanges() {
        this.form?.get('isPlaying')!
            .valueChanges
            .pipe(
                debounceTime(400),
                takeUntil(this._destroy$)
            )
            .subscribe((value: boolean) => {
                this.playStateChange.emit(value);
            });
    }

    private _watchForisAutoPanChanges() {
        this.form?.get('autoPan')!
            .valueChanges
            .pipe(
                debounceTime(400),
                takeUntil(this._destroy$)
            )
            .subscribe((value: boolean) => {
                this.autoPanChange.emit(value);
            });
    }

    private _watchForLoadChanges() {
        this._mapService.load$
            .pipe(
                filter(Boolean),
                takeUntil(this._destroy$),
            )
            .subscribe((data: any) => {
                this._map = data;
            });
    }

    private _buildForm(): void {
        this.form = this._fb.group({
            timeline: new FormControl(0),
            isPlaying: new FormControl(false),
            waypoints: new FormControl(false),
            track: new FormControl(true),
            speedMultiplier: new FormControl(1),
            autoPan: new FormControl(false),
        });
    }

}
