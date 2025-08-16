import { ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';
import { DocumentElement } from '../../enums/document-element';
import { FullscreenService } from '../../services/map-fullscreen.service';
import { FormsModule } from '@angular/forms';
import { MapService } from '../../services/map-service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
@Component({
    selector: 'map-fullscreen-control',
    templateUrl: './map-fullscreen.component.html',
    styleUrls: ['./map-fullscreen.component.scss'],
    imports: [CommonModule, ButtonModule, FormsModule, TooltipModule],
    providers: [FullscreenService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapFullscreenComponent implements OnDestroy, OnInit {

    public isFullscreen: boolean;
    private _isBrowser: boolean;
    private _container: any;
    private _destroy$ = new Subject<boolean>();

    @Input() public fullscreenClass: string | null = 'layout-map-container';

    public isFullscreen$ = this.fullscreenService.isFullscreen$;

    constructor(
        private fullscreenService: FullscreenService,
        @Inject(PLATFORM_ID) platformId: Object,
        @Inject(DOCUMENT) private document: Document
    ) {
        this._isBrowser = isPlatformBrowser(platformId);
    }

    public ngOnInit(): void {
        if (this._isBrowser) {
            this._container = this.document.querySelector(`.${this.fullscreenClass}`);
        }
    }

    public onFullscreenToggle() {
        this._isBrowser && this.fullscreenService.toggleFullscreen(this._container);
    }

    public ngOnDestroy(): void {
        this._destroy$.next(true);
        this._destroy$.complete();
    }
}