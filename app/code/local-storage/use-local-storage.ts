import { LocalStorageKey, LocalStorageValue } from '@/code/local-storage/local-storage';

export function useLocalStorage() {
  const removeLocalStorageValue = (key: LocalStorageKey): void => {
    window.localStorage.removeItem(key);
  };

  const setLocalStorageValue = (key: LocalStorageKey, item: LocalStorageValue) => {
    const expires = Date.now() + (item.expires || 0) * 1000;
    const stringified = JSON.stringify({ ...item, expires });

    window.localStorage.setItem(key, stringified);
  };

  const getLocalStorageValue = <T>(key: LocalStorageKey): LocalStorageValue<T> | undefined => {
    try {
      const item = window.localStorage.getItem(key);

      if (!item) {
        return undefined;
      }

      const value = JSON.parse(item);

      // Если поле не было установлено, значит считаем что ключ хранится "вечно"
      if (!value.expires) {
        return value;
      }

      const now = Date.now();

      // Значение устарело
      if (now > value.expires) {
        removeLocalStorageValue(key);
        return undefined;
      }

      return value;
    } catch (err) {
      throw new TypeError(`Error when parse JSON value with key - ${key}.`);
    }
  };

  return {
    removeLocalStorageValue,
    setLocalStorageValue,
    getLocalStorageValue
  };
}
