import ru from './ru.json';

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5646
 */
export enum AppLanguage {
  RU = 'ru',
}

export function createCommonLocalizeDictionary(
  lang: AppLanguage,
): typeof ru {
  if (lang === AppLanguage.RU) {
    return ru;
  }

  return {} as typeof ru;
}

export const translations = createCommonLocalizeDictionary(AppLanguage.RU);
type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, params?: { [s: string]: string | number } | undefined): string {
  let translation = translations[key] as string;

  if (!translation) {
    return key;
  }

  if (!params) {
    return translation;
  }

  Object.entries(params).forEach(([keyToReplace, value = '']) => {
    translation = translation
      .replace(`{{ ${keyToReplace} }}`, value.toString())
      .replace(`{{${keyToReplace}}}`, value.toString());
  });

  return translation;
}

export const translate = t;

/**
 * Функция для получения правильного ключа для числительных
 *
 * @param key
 * @param count
 * @returns {string}
 */
function pluralize(key: TranslationKey, count: number): TranslationKey {
  let n = Math.abs(count);
  n = n % 100;
  if (n >= 5 && n <= 20) {
    return key + '5' as TranslationKey;
  }
  n = n % 10;
  if (n === 1) {
    return key + '1' as TranslationKey;
  }
  if (n >= 2 && n <= 4) {
    return key + '2' as TranslationKey;
  }
  return key + '5' as TranslationKey;
}

/**
 * Перевод ключей с числительными
 *
 * {
 *   away1: 'Вас не было {{ value }} день',
 *   away2: 'Вас не было {{ value }} дня',
 *   away5: 'Вас не было {{ value }} дней'
 * }
 * @example tPlural('away', 2, { value: 32 }) -> 'Вас не было 32 дня'
 *
 * @param key
 * @param count
 * @param params
 * @returns {string}
 */
export function tPlural(key: string, count: number, params?: Record<string, string | number>): string {
  const pluralKey = pluralize(key as TranslationKey, count);

  return t(pluralKey, params);
}
