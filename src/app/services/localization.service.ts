import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { LOCALES } from '../constants/locales';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

export interface LanguageOption {
    name: string;
    code: string;
}

@Injectable({ providedIn: 'root' })
export class LocalizationService {
    private translate = inject(TranslateService);
    private primeng = inject(PrimeNG);
    private document = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

    public languages: LanguageOption[] = [
        { name: 'English', code: 'en' },
        { name: 'العربية', code: 'ar' },
        { name: '中文 (简体)', code: 'zh-Hans' },
        { name: '中文 (繁體)', code: 'zh-Hant' },
        { name: 'Français', code: 'fr' },
        { name: 'Deutsch', code: 'de' },
        { name: 'Italiano', code: 'it' },
        { name: '日本語', code: 'ja' },
        { name: '한국어', code: 'ko' },
        { name: 'Português', code: 'pt' },
        { name: 'Русский', code: 'ru' },
        { name: 'Español', code: 'es' },
        { name: 'Tiếng Việt', code: 'vi' },
        { name: 'Türkçe', code: 'tr' }
    ];

    constructor() {
        this.translate.addLangs(this.languages.map(l => l.code));
        const saved = localStorage.getItem('app_language') || 'en';
        this.setLanguage(saved);
        this.translate.onLangChange.subscribe(({ lang }) => {
            this.applyPrimeLocale(lang);
        });
    }

    public setLanguage(code: string) {
        if (!LOCALES[code]) code = 'en';
        this.translate.setDefaultLang(code);
        this.translate.use(code).subscribe(() => {
            localStorage.setItem('app_language', code);
            this.applyPrimeLocale(code);
            this.setHtmlLang(code);
        });
    }

    private applyPrimeLocale(code: string) {
        const cfg = LOCALES[code] || LOCALES['en'];
        this.primeng.setTranslation({...cfg, dateFormat: 'dd-mm-yy'});

    }

    private setHtmlLang(code: string) {
    if (isPlatformBrowser(this.platformId)) {
      this.document.documentElement.lang = code;
    }
  }
}
