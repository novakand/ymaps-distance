
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { map, mapTo, startWith } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class FullscreenService {
  private readonly _isFullscreen$ = new BehaviorSubject<boolean>(false);

  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      merge(
        fromEvent(document, 'fullscreenchange'),
        fromEvent(document, 'webkitfullscreenchange'),
        fromEvent(document, 'mozfullscreenchange'),
        fromEvent(document, 'MSFullscreenChange')
      )
        .pipe(
          startWith(null), 
          map(() => this.isCurrentlyFullscreen())
        )
        .subscribe((isFs) => this._isFullscreen$.next(isFs));
    });
  }

  public get isFullscreen$() {
    return this._isFullscreen$.asObservable();
  }

  public toggleFullscreen(element: HTMLElement): void {
    if (this.isCurrentlyFullscreen()) {
      this.exitFullscreen();
    } else {
      this.enterFullscreen(element);
    }
  }

  public enterFullscreen(element: HTMLElement): void {
    const request =
      element.requestFullscreen ||
      (element as any).webkitRequestFullscreen ||
      (element as any).mozRequestFullScreen ||
      (element as any).msRequestFullscreen;

    if (request) request.call(element);
  }

  public exitFullscreen(): void {
    const exit =
      document.exitFullscreen ||
      (document as any).webkitExitFullscreen ||
      (document as any).mozCancelFullScreen ||
      (document as any).msExitFullscreen;

    if (exit) exit.call(document);
  }

  public isCurrentlyFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );
  }
}

  
