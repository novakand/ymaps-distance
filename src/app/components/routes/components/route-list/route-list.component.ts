import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RoutesService } from '../../services/routes.service';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { IsTextOverflowingPipe } from '../../../../pipes/text-overflowing.pipe';
import { DialogService } from "primeng/dynamicdialog";
import { delay } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { LayoutService } from '../../../../services/layout.service';
import { TranslateModule } from '@ngx-translate/core';
import { DrawerModule } from 'primeng/drawer';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Menu } from 'primeng/menu';
import { MapService } from '../../../maps/services/map-service';
@Component({
    selector: 'app-vehicle-list',
    standalone: true,
    templateUrl: './route-list.component.html',
    styleUrls: ['./route-list.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        ToggleSwitchModule,
        FormsModule,
        TooltipModule,
        ButtonModule,
        Menu,
        IsTextOverflowingPipe,
        ReactiveFormsModule,
        PanelModule,
        ListboxModule,
        SkeletonModule,
        TranslateModule,
        DrawerModule
    ],
    providers: [DialogService]
})
export class RouteListComponent implements OnInit {
    public active: any = null;
    public form: FormGroup;
    public data: any[] = [];
    public noProgress: boolean;
    public inProgress: boolean;
    public dialog: any;
    public skeletons = Array(12);
    public isSmallScreen: boolean;
    public visible: boolean = false;
    public isSettings = false;
    public countRoutes = 0;
    public menuItems = [
        {
            label: 'Download Exel',
            icon: 'pi pi-download'
        }
    ];
    constructor(
        private _cdr: ChangeDetectorRef,
        private _fb: FormBuilder,
        private routeService: RoutesService,
        private _mapService: MapService,
        private router: Router,
        public dialogService: DialogService,
        private breakpointObserver: BreakpointObserver,
        public layoutService: LayoutService,
    ) {

        this.breakpointObserver
            .observe(['(min-width: 992px)', '(max-width: 767px)'])
            .pipe(delay(100))
            .subscribe((state: BreakpointState) => {
                this.isSmallScreen = state.breakpoints['(max-width: 767px)'];

            });
        this._buildForm();
    }

    public ngOnInit() {
         this._mapService.remove$.next(true);
        this.routeService.findAll()
            .pipe(
                delay(50),
            )
            .subscribe({
                next: data => {
                    this.data = data;
                    this._mapService.clusterData$.next(data);

                    this.countRoutes = this.data.length || 0;
                },
                error: err => {
                    console.error(err);
                }
            });
    }

    public onChange({ value }: any): void {
        this.router.navigate(['/route', value.id]);
    }

    public onOpen(): void {
        this.visible = !this.visible;
    }

    public toggleSideBar(): void {
        this.layoutService.toggleSideBar();

    }

    private _buildForm(): void {
        this.form = this._fb.group({
            isCities: new FormControl(true),

        });
    }

}
