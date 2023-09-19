import { isNumber } from '@/base/std';
/* eslint-disable @typescript-eslint/no-explicit-any */

export const isClient = typeof window !== 'undefined';
export const isServer = !isClient;
export const isTest = Boolean(process.env.IS_TEST);

const USER_AGENT = isClient ? window.navigator.userAgent : '' || '';

export const isTouchDevice = isClient ?
  Reflect.has(window, 'ontouchstart') ||
  window.navigator.maxTouchPoints > 0 ||
  window.navigator.maxTouchPoints && navigator.maxTouchPoints > 0 : false;

export const isMobile = /Mobi/i.test(USER_AGENT);
export const isIOS = /iPad|iPhone|iPod/.test(USER_AGENT);
export const isFirefox = /Firefox|FxiOS/i.test(USER_AGENT);
export const isChrome = isClient ? 'chrome' in window : false;
export const isDesktop = !isMobile;

export const isDev = Boolean(process.env.IS_DEV);

export const isSafari = Boolean(
  isClient ?
    window.navigator.vendor &&
    window.navigator.vendor.indexOf('Apple') > -1 &&
    USER_AGENT &&
    USER_AGENT.indexOf('CriOS') == -1 &&
    USER_AGENT.indexOf('FxiOS') == -1 : false,
);

export const CSSSupportMap: Record<string, boolean> = {
  HasSelector: isClient ? typeof CSS !== 'undefined' && CSS.supports('selector(:has(*))') : false,
};

export function toPixel(value: number): string {
  if (!isNumber(value)) {
    throw new TypeError('Expect value to be a number');
  }

  return value + 'px';
}

export function toPercent(value: number): string {
  if (!isNumber(value)) {
    throw new TypeError('Expect value to be a number');
  }

  return value + '%';
}

export function vibrate(pattern: VibratePattern): void {
  try {
    // eslint-disable-next-line compat/compat
    window.navigator.vibrate?.(pattern);
  } catch (e) {
    // it is ok
  }
}

function isCSSVariableName(name: string): boolean {
  return Boolean(name && name.length > 2 && name[0] == '-' && name[1] == '-');
}

function getCSSVariableName(name: string): string {
  if (isCSSVariableName(name)) {
    return name;
  }

  return '--' + name;
}

export function copyToClipboard(text: string): void {
  try {
    window.navigator.clipboard.writeText(text)
      .catch(() => { /* it is ok */
      });
  } catch (error) {
  }
}

export function setCSSVariable(
  element: HTMLElement,
  name: string, value: string): void {
  const v = getCSSVariableName(name);
  element.style.setProperty(v, value);
}

export function getCSSVariable(
  element: HTMLElement,
  name: string): string {
  const v = getCSSVariableName(name);
  const retval = element.style.getPropertyValue(v);
  return retval;
}

export async function parseJsonFile(file: File) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = event => resolve(JSON.parse(event.target?.result as string))
    fileReader.onerror = error => reject(error)
    fileReader.readAsText(file)
  })
}
