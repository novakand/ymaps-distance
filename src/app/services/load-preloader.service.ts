import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadPreloaderService  {

    private _isBrowser: boolean;
    private _preloader: HTMLHRElement;

    constructor(
        @Inject(PLATFORM_ID) platformId: Object,
        private _renderer: Renderer2,
    ) {
        this._isBrowser = isPlatformBrowser(platformId);
    }

    public show(): void {
        if (!this._isBrowser) return;
        this._preloader = this._renderer.selectRootElement('.preloader');
        this._renderer.setStyle(this._preloader, 'opacity', '1');
        this._renderer.setStyle(this._preloader, 'visibility', 'visible');
    }

    public hide(): void {
        if (!this._isBrowser) return;
        this._preloader = this._renderer.selectRootElement('.preloader');
        this._renderer.setStyle(this._preloader, 'opacity', '0');
        this._renderer.setStyle(this._preloader, 'visibility', 'hidden');
    }

}