import { ChangeDetectionStrategy, Component, computed, inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DrawerModule } from 'primeng/drawer';
import { MultiSelectModule } from 'primeng/multiselect';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MapService } from '../../services/map-service';
import { delay, filter, startWith, Subject, takeUntil } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { LocalizationService } from '../../../../services/localization.service';
import { TranslateModule } from '@ngx-translate/core';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { LayoutService } from '../../../../services/layout.service';
import { $t, updatePreset, updateSurfacePalette } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import { Noir } from '../../../../app-theme';

const presets = {
    Aura,
    Material,
    Lara,
    Nora
};
@Component({
    selector: 'map-sidebar',
    templateUrl: './map-sidebar.component.html',
    styleUrls: ['./map-sidebar.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ButtonModule,
        DrawerModule,
        MultiSelectModule,
        FloatLabelModule,
        TranslateModule,
        SelectModule,
        ToggleSwitchModule
    ],
    providers: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapSidebarComponent implements OnDestroy, OnInit {

    @Input() public isVisible = false;
    @Output() public visibleChange: Subject<boolean> = new Subject<boolean>();

    @Output() public changesLanguage: Subject<boolean> = new Subject<boolean>();
    @Output() public changesBaseLayers: Subject<boolean> = new Subject<boolean>();
    @Output() public changesCustomLayers: Subject<boolean> = new Subject<boolean>();

    public platformId = inject(PLATFORM_ID);
    public presets = Object.keys(presets);

    constructor(
        private _fb: FormBuilder,
        private _mapService: MapService,
        private localization: LocalizationService,
        public layoutService: LayoutService,
    ) {
    }
    public form: FormGroup;
    public state: any[] = [];
    public style: string;
    public mapLanguage = { name: 'English', code: 'en' };
    public mapStyle = { name: 'Base', code: 'base' };
    private _map: any;
    private _destroy$ = new Subject<boolean>();

    public defaultOpts: any = {
        language: { name: 'English', code: 'en' },
        baseLayer: { name: 'Base', code: 'base' },
        customLayers: null
    }

    public languageOptions = this.localization.languages;

    public stylesOptions: any[] = [
        { name: 'Base', code: 'base' },
    ];

    private _watchForLoadChanges() {
        this._mapService.load$
            .pipe(filter(Boolean), takeUntil(this._destroy$))
            .subscribe((mapInstance: any) => {
                this._map = mapInstance;

            });
    }

    public onVisibleChange(event: any): void {
        this.visibleChange.next(event);
    }

    public ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.complete();
    }

    public ngOnInit(): void {
        this._buildForm();
        this._watchForLoadChanges();


        if (isPlatformBrowser(this.platformId)) {
            this.onPresetChange(this.layoutService.config().preset);
            this.toggleRTL(this.layoutService.config().RTL!);
        }

        this.form.get('language')!.valueChanges
            .pipe(
                delay(0)
            )
            .subscribe(langData => {
                this.mapLanguage = langData;
            });


        this.form.get('style')!
            .valueChanges
            .pipe(delay(100), takeUntil(this._destroy$))
            .subscribe((data) => {
                const { code: styleCode } = data;

            });



        this.form.get('darkMode')!.valueChanges
            .pipe(
                delay(0)
            )
            .subscribe(darkTheme => {
                this.layoutService.config.update((state) => ({ ...state, darkTheme: darkTheme }));
            });

    }

    public get toggleDarkMode(): any {
        return this.layoutService.config().darkTheme;
    }

    public toggleRTL(value: boolean): void {
        const htmlElement = document.documentElement;
        value ? htmlElement.setAttribute('dir', 'rtl') : htmlElement.removeAttribute('dir');
    }

    public onPresetChange(event: any): void {
        this.layoutService.config.update((state) => ({ ...state, preset: event }));
        const preset = presets[event];
        $t().preset(preset).preset(Noir).use({ useDefaultOptions: true });
    }

    public isDarkMode = computed(() => this.layoutService.config().darkTheme);


    public selectedPrimaryColor = computed(() => {
        return this.layoutService.config()?.primary;
    });

    public primaryColors = computed(() => {
        const presetPalette = presets[this.layoutService.config()?.preset!].primitive;
        const colors = ['emerald', 'green', 'lime', 'orange', 'amber', 'yellow', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
        const palettes = [{ name: 'noir', palette: {} }, { name: 'primary', palette: {} }];
        colors?.forEach((color) => {
            palettes.push({
                name: color,
                palette: presetPalette[color]
            });
        });

        return palettes;
    });

    private applyLanguage(code: string) {
        if (!this._map ) {
            return;
        }

    }

    public onChangeCustomLayers(event: any) {
        this.changesCustomLayers.next(event);
    }

    public onClose(): void {
        this.isVisible = false;
        this.visibleChange.next(this.isVisible);
    }

    private _buildForm(): void {
        this.form = this._fb.group({
            language: new FormControl({ value: { name: 'English', code: 'en' }, disabled: true }),
            style: new FormControl({ value: { name: 'Base', code: 'base' }, disabled: true }),
            darkMode: new FormControl(this.layoutService.config().darkTheme),
        });
    }

}
