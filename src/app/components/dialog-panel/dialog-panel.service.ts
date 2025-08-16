import { Injectable, Injector, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DialogDrawer } from './models/dialog-panel.model';
import { IDialogPanelConfig } from './interfaces/dialog-panel.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogDrawerService implements OnDestroy {
  private afterClosedMap = new Map<OverlayRef, Subject<any>>();
  private routerSubscription: Subscription;

  constructor(private overlay: Overlay,
    private injector: Injector,
    private router: Router) {

    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.closeAll());
  }

  public open<T, D = any>(
    component: any,
    config?: IDialogPanelConfig
  ): { overlayRef: OverlayRef; afterClosed: Subject<any> } {
    const overlayRef = this.overlay.create(this.getOverlayConfig(config));
    const afterClosed$ = new Subject<any>();
    this.afterClosedMap.set(overlayRef, afterClosed$);

    this.extendOverlayRef(overlayRef, afterClosed$);

    const injector = this.createInjector({ data: config?.data, overlayRef });
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);
    overlayRef.backdropClick().subscribe(() => this.close(overlayRef, null));

    return { overlayRef, afterClosed: afterClosed$ };
  }

  private extendOverlayRef(overlayRef: OverlayRef, afterClosed$: Subject<any>) {
    (overlayRef as any).close = (result: any) => {
      this.close(overlayRef, result);
    };
  }

  private createInjector(context: DialogDrawer): Injector {
    return Injector.create({
      providers: [{ provide: DialogDrawer, useValue: context }],
      parent: this.injector,
    });
  }

  private getOverlayConfig(config?: IDialogPanelConfig): OverlayConfig {
    return {
      hasBackdrop: config?.hasBackdrop ?? true,
      backdropClass: config?.backdropClass ?? 'cdk-overlay-dark-backdrop',
      panelClass: config?.panelClass ?? 'dialog-panel',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    };
  }

  public close(overlayRef: OverlayRef, result: any): void {
    if (overlayRef && overlayRef.hasAttached()) {
      overlayRef.detach();

      const afterClosed$ = this.afterClosedMap.get(overlayRef);
      if (afterClosed$) {
        afterClosed$.next(result);
        afterClosed$.complete();
        this.afterClosedMap.delete(overlayRef);
      }
    }
  }


  public closeAll(): void {
    this.afterClosedMap.forEach((_, overlayRef) => {
      this.close(overlayRef, null);
    });
  }

  public ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
