import { Component, computed, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { PrimeNG } from 'primeng/config';
import { DrawerModule } from 'primeng/drawer';
import { $t, updatePreset, updateSurfacePalette } from '@primeng/themes';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import { LayoutService } from '../../../../services/layout.service';

const presets = {
    Aura,
    Material,
    Lara,
    Nora
};

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    imports: [CommonModule,
        FormsModule,
        DrawerModule,
        RadioButtonModule,
        ButtonModule,
        InputSwitchModule,
        ToggleSwitchModule
    ]
})
export class ConfigComponent implements OnInit {

    @Input() minimal: boolean = true;

    public isThemes = false;
    public componentThemes: any[] = [];
    public isSettings = false;
    public surfaces: any;
    public scales: number[] = [12, 13, 14, 15, 16];
    public selectedSurfaceColor = computed(() => this.layoutService.config().surface);

    constructor(
        public layoutService: LayoutService,
        public config: PrimeNG,
    ) {

        this.surfaces = [
            {

                name: 'slate',
                palette: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617'
                }
            },
            {
                name: 'gray',
                palette: {
                    0: '#ffffff',
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712'
                }
            },
            {
                name: 'zinc',
                palette: {
                    0: '#ffffff',
                    50: '#fafafa',
                    100: '#f4f4f5',
                    200: '#e4e4e7',
                    300: '#d4d4d8',
                    400: '#a1a1aa',
                    500: '#71717a',
                    600: '#52525b',
                    700: '#3f3f46',
                    800: '#27272a',
                    900: '#18181b',
                    950: '#09090b'
                }
            },
            {
                name: 'neutral',
                palette: {
                    0: '#ffffff',
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a'
                }
            },
            {
                name: 'stone',
                palette: {
                    0: '#ffffff',
                    50: '#fafaf9',
                    100: '#f5f5f4',
                    200: '#e7e5e4',
                    300: '#d6d3d1',
                    400: '#a8a29e',
                    500: '#78716c',
                    600: '#57534e',
                    700: '#44403c',
                    800: '#292524',
                    900: '#1c1917',
                    950: '#0c0a09'
                }
            },
            {
                name: 'soho',
                palette: {
                    0: '#ffffff',
                    50: '#ececec',
                    100: '#dedfdf',
                    200: '#c4c4c6',
                    300: '#adaeb0',
                    400: '#97979b',
                    500: '#7f8084',
                    600: '#6a6b70',
                    700: '#55565b',
                    800: '#3f4046',
                    900: '#2c2c34',
                    950: '#16161d'
                }
            },
            {
                name: 'viva',
                palette: {
                    0: '#ffffff',
                    50: '#f3f3f3',
                    100: '#e7e7e8',
                    200: '#cfd0d0',
                    300: '#b7b8b9',
                    400: '#9fa1a1',
                    500: '#87898a',
                    600: '#6e7173',
                    700: '#565a5b',
                    800: '#3e4244',
                    900: '#262b2c',
                    950: '#0e1315'
                }
            },
            {
                name: 'ocean',
                palette: {
                    0: '#ffffff',
                    50: '#fbfcfc',
                    100: '#F7F9F8',
                    200: '#EFF3F2',
                    300: '#DADEDD',
                    400: '#B1B7B6',
                    500: '#828787',
                    600: '#5F7274',
                    700: '#415B61',
                    800: '#29444E',
                    900: '#183240',
                    950: '#0c1920'
                }
            }
        ];
    }

    public ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.onPresetChange(this.layoutService.config().preset);
            this.toggleRTL(this.layoutService.config().RTL!);
            this.config.ripple.set(true);
        }

        this.componentThemes = [
            { name: 'primary', color: '#1C2135' },
        ];

    }

    public get isRTL(): boolean | undefined {
        return this.layoutService.config().RTL;
    }

    public isDarkMode = computed(() => this.layoutService.config().darkTheme);

    public get ripple(): boolean {
        return this.config.ripple();
    }

    public set ripple(value: boolean) {
        this.config.ripple.set(value);
    }

    public get toggleDarkMode(): any {
        return this.layoutService.config().darkTheme;
    }

    public set toggleDarkMode(_val: boolean) {
        this.layoutService.config.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    public onRTLChange(value: boolean): void {
        this.layoutService.config.update((state) => ({ ...state, RTL: value }));
        if (!(document as any).startViewTransition) {
            this.toggleRTL(value);
            return;
        }

        (document as any).startViewTransition(() => this.toggleRTL(value));
    }

    public updateColors(event: any, type: string, color: any): void {
        if (type === 'primary') {
            this.layoutService.config.update((state) => ({ ...state, primary: color.name }));
        } else if (type === 'surface') {
            this.layoutService.config.update((state) => ({ ...state, surface: color.name }));
        }
        this.applyTheme(type, color);

        event.stopPropagation();
    }

    public applyTheme(type: string, color: any): void {
        if (type === 'primary') {
            updatePreset(this.getPresetExt());
        } else if (type === 'surface') {
            updateSurfacePalette(color.palette);
        }
    }

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


    public selectedPrimaryColor = computed(() => {
        return this.layoutService.config()?.primary;
    });


    public getPresetExt(): any {
        const color = this.primaryColors().find((c) => c.name === this.selectedPrimaryColor());
        if (color?.name === 'primary') {
            return {
                components: {
                    inputnumber: {
                        button: {
                            width: '3rem'
                        }
                    },
                    message: {
                        error:
                        {
                            color: '#f87171',
                            simple: {
                                color: '#f87171',
                            }
                        }
                    },
                    multiselect: {
                        chip: {
                            border: {
                                radius: '16px'
                            }
                        }
                    },

                    toggleswitch: {
                        height: '1.75rem',
                        width: '3rem',
                        handle: {
                            size: '1.25rem'
                        }
                    },
                    treeselect: {
                        chip: {
                            border: {
                                radius: '16px'
                            }
                        },
                        tree: {
                            padding: '0.5rem'
                        }
                    }
                },
                semantic: {
                    primary: {
                        "50": "#eff6ff",
                        "100": "#dbeafe",
                        "200": "#bfdbfe",
                        "300": "#93c5fd",
                        "400": "#60a5fa",
                        "500": "#3b82f6",
                        "600": "#2563eb",
                        "700": "#1d4ed8",
                        "800": "#1e40af",
                        "900": "#1e3a8a",
                        "950": "#172554"
                    },
                    colorScheme: {
                        light: {
                            surface: {
                                0: '#ffffff',
                                50: '#f8fafc',
                                100: '#f1f5f9',
                                200: '#e2e8f0',
                                300: '#cbd5e1',
                                400: '#94a3b8',
                                500: '#64748b',
                                600: '#475569',
                                700: '#334155',
                                800: '#1e293b',
                                900: '#0f172a',
                                950: '#020617'
                            },
                            primary: {
                                color: '#424E7D',
                                contrastColor: '#ffffff',
                                hoverColor: '#3e4258',
                                activeColor: '#5d6179'
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.100}',
                                color: '{primary.700}',
                                focusColor: '{primary.800}'
                            }
                        },
                        dark: {
                            surface: {
                                "50": "#eeeeff",
                                "100": "#d1d8f0",
                                "200": "#b8bdda",
                                "300": "#9da3c4",
                                "400": "#888fb2",
                                "500": "#747ca2",
                                "600": "#656e90",
                                "700": "#535a79",
                                "800": "#424862",
                                "900": "#2e334a",
                                "950": "#2e334a",
                            },
                            primary: {
                                color: '#424E7D',
                                contrastColor: '#ffffff',
                                hoverColor: '#3e4258',
                                activeColor: '#5d6179'
                            },
                            highlight: {
                                background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                color: 'rgba(255,255,255,.87)',
                                focusColor: 'rgba(255,255,255,.87)'
                            }
                        }
                    },
                    formField: {
                        paddingX: "0.75rem",
                        paddingY: "0.75rem",
                        sm: {
                            fontSize: "0.875rem",
                            paddingX: "0.625rem",
                            paddingY: "0.375rem"
                        },
                        lg: {
                            fontSize: "1.125rem",
                            paddingX: "0.875rem",
                            paddingY: "0.625rem"
                        },
                        borderRadius: "{border.radius.md}",
                        focusRing: {
                            width: "0",
                            style: "none",
                            color: "transparent",
                            offset: "0",
                            shadow: "none"
                        },
                        transitionDuration: "{transition.duration}"
                    },
                    navigation: {
                        list: {
                            padding: "0.25rem 0.25rem",
                            gap: "2px"
                        },
                        item: {
                            padding: "0.75rem 0.75rem",
                            borderRadius: "{border.radius.sm}",
                            gap: "0.5rem"
                        },
                        submenuLabel: {
                            padding: "0.5rem 0.75rem",
                            fontWeight: "600"
                        },
                        submenuIcon: {
                            size: "0.875rem"
                        }
                    },
                    list: {
                        padding: "0.25rem 0.25rem",
                        gap: "2px",
                        header: {
                            padding: "0.5rem 1rem 0.25rem 1rem"
                        },
                        option: {
                            padding: "0.75rem 0.75rem",
                            borderRadius: "{border.radius.sm}"
                        },
                        optionGroup: {
                            padding: "0.75rem 0.75rem",
                            fontWeight: "600"
                        }
                    },
                }
            };
        }

        if (color?.name === 'noir') {
            return {
                semantic: {
                    primary: {
                        50: '{surface.50}',
                        100: '{surface.100}',
                        200: '{surface.200}',
                        300: '{surface.300}',
                        400: '{surface.400}',
                        500: '{surface.500}',
                        600: '{surface.600}',
                        700: '{surface.700}',
                        800: '{surface.800}',
                        900: '{surface.900}',
                        950: '{surface.950}'
                    },
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.950}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.800}',
                                activeColor: '{primary.700}'
                            },
                            highlight: {
                                background: '{primary.950}',
                                focusBackground: '{primary.700}',
                                color: '#ffffff',
                                focusColor: '#ffffff'
                            }
                        },
                        dark: {
                            primary: {
                                color: '{primary.50}',
                                contrastColor: '{primary.950}',
                                hoverColor: '{primary.200}',
                                activeColor: '{primary.300}'
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.300}',
                                color: '{primary.950}',
                                focusColor: '{primary.950}'
                            }
                        }
                    }
                }
            };
        } else {
            if (this.layoutService.config().preset === 'Nora') {
                return {
                    semantic: {
                        primary: color?.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.600}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.700}',
                                    activeColor: '{primary.800}'
                                },
                                highlight: {
                                    background: '{primary.600}',
                                    focusBackground: '{primary.700}',
                                    color: '#ffffff',
                                    focusColor: '#ffffff'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.400}',
                                    activeColor: '{primary.300}'
                                },
                                highlight: {
                                    background: '{primary.500}',
                                    focusBackground: '{primary.400}',
                                    color: '{surface.900}',
                                    focusColor: '{surface.900}'
                                }
                            }
                        }
                    }
                };
            } else if (this.layoutService.config().preset === 'Material') {
                return {
                    semantic: {
                        primary: color?.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.400}',
                                    activeColor: '{primary.300}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.color}, transparent 88%)',
                                    focusBackground: 'color-mix(in srgb, {primary.color}, transparent 76%)',
                                    color: '{primary.700}',
                                    focusColor: '{primary.800}'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.400}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.300}',
                                    activeColor: '{primary.200}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                    color: 'rgba(255,255,255,.87)',
                                    focusColor: 'rgba(255,255,255,.87)'
                                }
                            }
                        }
                    }
                };
            } else {
                return {
                    semantic: {
                        primary: color?.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.600}',
                                    activeColor: '{primary.700}'
                                },
                                highlight: {
                                    background: '{primary.50}',
                                    focusBackground: '{primary.100}',
                                    color: '{primary.700}',
                                    focusColor: '{primary.800}'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.400}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.300}',
                                    activeColor: '{primary.200}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                    color: 'rgba(255,255,255,.87)',
                                    focusColor: 'rgba(255,255,255,.87)'
                                }
                            }
                        }
                    }
                };
            }
        }
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }
    set scale(_val: number) {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: _val,
        }));
    }


    public set inputStyle(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            inputStyle: _val,
        }));
    }

    public platformId = inject(PLATFORM_ID);

    public presets = Object.keys(presets);


    public onPresetChange(event: any): void {
        this.layoutService.config.update((state) => ({ ...state, preset: event }));
        const preset = presets[event];
        const surfacePalette = this.surfaces.find((s) => s.name === this.selectedSurfaceColor())?.palette;
        if (this.layoutService.config().preset === 'Material') {
            document.body.classList.add('material');
            this.config.ripple.set(true);
        } else {
            document.body.classList.remove('material');
            this.config.ripple.set(false);
        }
        $t().preset(preset).preset(this.getPresetExt()).use({ useDefaultOptions: false });
    }

    public toggleRTL(value: boolean): void {
        const htmlElement = document.documentElement;
        value ? htmlElement.setAttribute('dir', 'rtl') : htmlElement.removeAttribute('dir');
    }

    public onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    public decrementScale(): void {
        this.scale--;
    }

    public incrementScale(): void {
        this.scale++;
    }
}
