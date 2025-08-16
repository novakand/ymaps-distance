import { Component, Renderer2, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientService } from '../../../../../services/http-client.service';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { LoadPreloaderService } from '../../../../../services/load-preloader.service';
import { Subject, Subscription } from 'rxjs';
import { ConfigComponent } from '../../config/config.component';
import { DividerModule } from 'primeng/divider';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LayoutService } from "../../../../../services/layout.service";

@Component({
  selector: 'app-authorized-layout',
  imports: [CommonModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    DividerModule, 
    TooltipModule, 
    ButtonModule, 
    ConfigComponent, 
    ProgressBarModule, 
  ],
  providers: [
   HttpClientService, 
   LoadPreloaderService,
    MessageService],
  templateUrl: './authorized-layout.component.html',
  styleUrl: './authorized-layout.component.scss'
})
export class AuthorizedLayoutComponent {

  private overlayMenuOpenSubscription: Subscription | null = null;
  private menuOutsideClickListener: (() => void) | null = null;
  private menuScrollListener: (() => void) | null = null;

  public destroy$ = new Subject<boolean>();

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,

  ) {
    this._watchForoverlayMenu();
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit() { }

  public ngOnDestroy(): void {
    this._destroyListeners();
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  private _watchForoverlayMenu(): void {
    this._destroyListeners();

  }

 

  private _shouldListenForScroll(): boolean {
    return this.layoutService.isHorizontal() || this.layoutService.isSlim() || this.layoutService.isSlimPlus();
  }

  private _destroyListeners(): void {
    this.overlayMenuOpenSubscription?.unsubscribe();
    this.overlayMenuOpenSubscription = null;

    this.menuOutsideClickListener?.();
    this.menuOutsideClickListener = null;

    this.menuScrollListener?.();
    this.menuScrollListener = null;
  }

  public blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  public unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' +
          'blocked-scroll'.split(' ').join('|') +
          '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  public hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }

    if (this.menuScrollListener) {
      this.menuScrollListener();
      this.menuScrollListener = null;
    }

    this.unblockBodyScroll();
  }

}