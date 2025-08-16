import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { HttpClientService } from './services/http-client.service';
import { LoadPreloaderService } from './services/load-preloader.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PageLayout } from './components/layout/enums/page-layout.enum';
import { PageLayoutService } from './components/layout/services/page-layout.service';
import { AuthorizedLayoutComponent } from './components/layout/components/authorized-layout/component/authorized-layout.component';
import { LayoutService } from './services/layout.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { PrimeNG } from 'primeng/config';
import { LoadProgressService } from './services/load-progress.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Toast, } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { UnAuthorizedLayoutComponent } from './components/layout/components/unauthorized-layout/unauthorized.layout.component';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule,
    Toast,
    RouterOutlet,
    ConfirmDialog,
    ButtonModule,
    AuthorizedLayoutComponent,
    UnAuthorizedLayoutComponent,
  ],
  providers: [HttpClientService, ConfirmationService, LoadPreloaderService, MessageService],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {

  readonly PageLayout = PageLayout;
  public isLoading$ = new BehaviorSubject<boolean>(true);

  public destroy$ = new Subject<boolean>();

  public overlayMenuOpenSubscription: Subscription;
  public menuOutsideClickListener: any;

  public menuScrollListener: any;

  public model: any[] = [];
  public timeout: any = null;

  constructor(
    public pageLayoutService: PageLayoutService,
    private _loadProgressService: LoadProgressService,
    public layoutService: LayoutService,
    private router: Router,
    private config: PrimeNG,
    public renderer: Renderer2,
    private messageService: MessageService,
    private translateService: TranslateService,
    private localization: LocalizationService,
  ) {
    this._watchForRoute();
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void { }

  public onActivateRouterOutlet() {}

  private _watchForRoute(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading$.next(true);
        if (this._loadProgressService.inProgress) {
          this._loadProgressService.hide(9999);
        }
      } else if (event instanceof NavigationEnd) {
        this.isLoading$.next(false);
      } else if (event instanceof NavigationCancel) {
        this.isLoading$.next(false);
      } else if (event instanceof NavigationError) {
        this.isLoading$.next(false);
      }
    });
  }

 public get containerClass(): any {
    return {
      'layout-light': !this.layoutService.config().darkTheme,
      'layout-dark': this.layoutService.config().darkTheme,
      'layout-colorscheme-menu':
        this.layoutService.config().menuTheme === 'colorScheme',
      'layout-primarycolor-menu':
        this.layoutService.config().menuTheme === 'primaryColor',
      'layout-transparent-menu':
        this.layoutService.config().menuTheme === 'transparent',
      'layout-overlay':
        this.layoutService.config().menuMode === 'overlay',
      'layout-static': this.layoutService.config().menuMode === 'static',
      'layout-slim': this.layoutService.config().menuMode === 'slim',
      'layout-slim-plus':
        this.layoutService.config().menuMode === 'slim-plus',
      'layout-horizontal':
        this.layoutService.config().menuMode === 'horizontal',
      'layout-reveal': this.layoutService.config().menuMode === 'reveal',
      'layout-drawer': this.layoutService.config().menuMode === 'drawer',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config().menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active':
        this.layoutService.state.staticMenuMobileActive,
      'layout-sidebar-active': this.layoutService.state.sidebarActive,
      'layout-sidebar-anchored': this.layoutService.state.anchored,
      'layout-map-overlay-active': this.layoutService.isMapSidebar(),
    };
  }


}
