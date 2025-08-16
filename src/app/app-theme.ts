import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const Noir = definePreset(Aura, {
    components: {
        inputnumber: {
            button: {
                width: '3rem'
            }
        },
        dropdown: {
            background: 'transparent'
        },
        autocomplete:
            { dropdown: { background: 'red' } },
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
                    color: '#1863CC',
                    contrastColor: '#ffffff',
                    hoverColor: '#124C9E',
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
                    "50": "#3e3e40",
                    "100": "#363638",
                    "200": "#18181b",
                    "300": "#2a2a2c",
                    "400": "#57575C",
                    "500": "#222224",
                    "600": "#1e1e20",
                    "700": "#1a1a1c",
                    "800": "#161618",
                    "900": "#121214",
                    "950": "#0f0f11"
                },
                primary: {
                    color: '#1863CC',
                    contrastColor: '#ffffff',
                   hoverColor: '#124C9E',
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
});