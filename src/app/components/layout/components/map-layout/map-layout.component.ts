import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, computed, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { Subject, delay, filter } from 'rxjs';
import { LoadProgressService } from '../../../../services/load-progress.service';
import { MapComponent } from '../../../maps/map.component';
import { LayoutService } from '../../../../services/layout.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
    selector: 'map-layout',
    imports: [CommonModule,
        MapComponent,
        RouterModule,
        RouterOutlet, ProgressBarModule, RouterOutlet],
    providers: [],
    templateUrl: './map-layout.component.html',
    styleUrl: './map-layout.component.scss',
})
export class MapLayoutComponent implements AfterViewInit, OnInit, OnDestroy {

    public showProgress: boolean = false;
    public sidenavViewContent: string;
    public toolbarActions: any[];
    public excludedToolbarIds = ['filter', 'export', 'settings'];
    public isSmallScreen: boolean;

    public destroy$ = new Subject<boolean>();

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _cdr: ChangeDetectorRef,
        public layoutService: LayoutService,
        private _loadProgressService: LoadProgressService,
         private breakpointObserver: BreakpointObserver,

    ) {

        this.breakpointObserver
            .observe(['(max-width: 767px)'])
            .subscribe((state: BreakpointState) => {
                this.isSmallScreen = state.breakpoints['(max-width: 767px)'];
            });
        this._watchForRouteChanges();
        this._watchForLoadProgress();
    }

    private _watchForRouteChanges(): void {
        this._router.events.pipe(
            filter((event) => event instanceof NavigationEnd)
        ).subscribe((event) => {
            window.scrollTo(0, 0);
        });
    }

    private _watchForLoadProgress(): void {
        this._loadProgressService.inProgress
            .subscribe((progress: boolean) => {
                this.showProgress = progress;
            });
    }

    public ngOnInit(): void {
       
    }

    public ngAfterViewInit(): void { }

    public onActivateRouterOutlet(): void {
       
    }
    public toggleSideBar(): void {
        this.layoutService.toggleSideBar();
    }

    public isMapSidebar = computed(() => this.layoutService.isMapSidebar());


    public onShowMap() {
        this.layoutService.toggleSideBar();
    }

    public ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

}
