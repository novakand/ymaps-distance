// src/app/constants/locales.ts
import { en }    from 'primelocale/js/en.js';
import { ru }    from 'primelocale/js/ru.js';
import { ar }    from 'primelocale/js/ar.js';
import { fr }    from 'primelocale/js/fr.js';
import { de }    from 'primelocale/js/de.js';
import { it }    from 'primelocale/js/it.js';
import { ja }    from 'primelocale/js/ja.js';
import { ko }    from 'primelocale/js/ko.js';
import { pt }    from 'primelocale/js/pt.js';
import { es }    from 'primelocale/js/es.js';
import { vi }    from 'primelocale/js/vi.js';
import { tr }    from 'primelocale/js/tr.js';
// китайские локали как JSON
import zhCNjson  from 'primelocale/zh-CN.json';
import zhTWjson  from 'primelocale/zh-TW.json';

function unwrap<T>(mod: any, key: string): T {
  return (mod[key] as T) ?? (mod.default as T) ?? mod;
}

export const LOCALES: Record<string, any> = {
  en:    unwrap(en,    'en'),
  ru:    unwrap(ru,    'ru'),
  ar:    unwrap(ar,    'ar'),
  fr:    unwrap(fr,    'fr'),
  de:    unwrap(de,    'de'),
  it:    unwrap(it,    'it'),
  ja:    unwrap(ja,    'ja'),
  ko:    unwrap(ko,    'ko'),
  pt:    unwrap(pt,    'pt'),
  es:    unwrap(es,    'es'),
  vi:    unwrap(vi,    'vi'),
  tr:    unwrap(tr,    'tr'),
  'zh-Hans': unwrap(zhCNjson, 'zh-CN'),
  'zh-Hant': unwrap(zhTWjson, 'zh-TW')
};
