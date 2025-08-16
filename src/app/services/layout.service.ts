import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export type MenuMode =
    | 'static'
    | 'overlay'
    | 'horizontal'
    | 'slim'
    | 'slim-plus'
    | 'reveal'
    | 'drawer';

export type ColorScheme = 'light' | 'dark' | 'dim';

export type MenuColorScheme = 'colorScheme' | 'primaryColor' | 'transparent';

export interface AppConfig {
    inputStyle: string;
    colorScheme: ColorScheme;
    theme: string;
    ripple: boolean;
    menuMode: MenuMode;
    scale: number;
    menuTheme: MenuColorScheme;
}

export interface AppState {
    preset?: string;
    primary?: string;
    surface?: string;
    darkTheme?: boolean;
    menuActive?: boolean;
    designerKey?: string;
    menuMode: MenuMode;
    scale: number;
    menuTheme: MenuColorScheme;
    RTL?: boolean;
}


interface LayoutState {
    staticMenuDesktopInactive: boolean;
    overlayMenuActive: boolean;
    profileSidebarVisible: boolean;
    configSidebarVisible: boolean;
    staticMenuMobileActive: boolean;
    menuHoverActive: boolean;
    sidebarActive: boolean;
    anchored: boolean;
    mapOverlayVisible: boolean;
    mapOverlaySidebar?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {

    private readonly STORAGE_KEY = 'appConfigState';

    public state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false,
        sidebarActive: false,
        mapOverlayVisible: false,
        anchored: false
    };

    public  isMapSidebar = signal(true);

    public newsActive = signal(false);

    private configUpdate = new Subject<any>();

    public overlayOpen = new Subject<any>();

    public overlayChanages = new BehaviorSubject<any>(null);

    public config = signal<AppState>(null!);

    public platformId = inject(PLATFORM_ID);

    public document = inject(DOCUMENT);

    public transitionComplete = signal<boolean>(false);

    public configUpdate$ = this.configUpdate.asObservable();

    public overlayOpen$ = this.overlayOpen.asObservable();

    private initialized = false;
    constructor() {
        this.config.set({ ...this.loadAppState() });

        effect(
            () => {
                const state = this.config();

                if (!this.initialized || !state) {
                    this.initialized = true;
                    return;
                }
                this.saveAppState(state);
                this.handleDarkModeTransition(state);
                this.changeScale(state.scale);
                this.onConfigUpdate();
            },
            { allowSignalWrites: true }
        );
    }



    public toggleSideBar(): void {
        this.isMapSidebar.update(current => !current);
        this.overlayChanages.next(true);
    }

    private handleDarkModeTransition(state: AppState): void {
        if (isPlatformBrowser(this.platformId)) {
            if ((document as any).startViewTransition) {
                this.startViewTransition(state);
            } else {
                this.toggleDarkMode(state);
                this.onTransitionEnd();
            }
        }
    }

    private startViewTransition(state: AppState): void {
        const transition = (document as any).startViewTransition(() => {
            this.toggleDarkMode(state);
        });

        transition.ready.then(() => this.onTransitionEnd());
    }

    private onTransitionEnd() {
        this.transitionComplete.set(true);
        setTimeout(() => {
            this.transitionComplete.set(false);
        });
    }

    private toggleDarkMode(state: AppState): void {
        if (state.darkTheme) {
            this.document.documentElement.classList.add('p-dark');
        } else {
            this.document.documentElement.classList.remove('p-dark');
        }
    }

    private saveAppState(state: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        }
    }

    public loadAppState(): any {
        if (isPlatformBrowser(this.platformId)) {
            const storedState = localStorage.getItem(this.STORAGE_KEY);
            if (storedState) {
                return JSON.parse(storedState);
            }
        }
        return {
            preset: 'Aura',
            primary: 'primary',
            surface: null,
            darkTheme: false,
            menuActive: false,
            scale: 14,
            menuTheme: 'transparent',
            menuMode: 'static',
            RTL: false
        };
    }

    public isMenuActive(): boolean {
        if (this.isOverlay()) {
            return this.state.overlayMenuActive;
        }

        if (this.isDesktop()) {
            return !this.state.staticMenuDesktopInactive;
        }

        return this.state.staticMenuMobileActive;
    }

    public hideNews() {
        this.newsActive.set(false);
    }

    public showNews() {
        this.newsActive.set(true);
    }

    public onMenuToggle() {
        if (this.isOverlay()) {
            this.state.overlayMenuActive = !this.state.overlayMenuActive;

            if (this.state.overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.state.staticMenuDesktopInactive =
                !this.state.staticMenuDesktopInactive;
        } else {
            this.state.staticMenuMobileActive =
                !this.state.staticMenuMobileActive;

            if (this.state.staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }

        this.overlayChanages.next(true);
    }

    public onMapToggle(): void {
        this.state.mapOverlayVisible = !this.state.mapOverlayVisible;
        this.overlayChanages.next(true);
    }

    public onOverlaySubmenuOpen() {
        this.overlayOpen.next(null);
    }

    public showProfileSidebar() {
        this.state.profileSidebarVisible = true;
    }

    public showConfigSidebar() {
        this.state.configSidebarVisible = true;
    }

    public isOverlay() {
        return this.config().menuMode === 'overlay';
    }

    public isDesktop() {
        return window.innerWidth > 991;
    }

    public isSlim() {
        return this.config().menuMode === 'slim';
    }

    public isSlimPlus() {
        return this.config().menuMode === 'slim-plus';
    }

    public isHorizontal() {
        return this.config().menuMode === 'horizontal';
    }

    public isMobile() {
        return !this.isDesktop();
    }

    public onConfigUpdate() {
        this.configUpdate.next(this.config());
    }

    public changeScale(value: number) {
        document.documentElement.style.fontSize = `${value}px`;
    }
}
