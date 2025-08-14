import type { SerializeOptions } from 'cookie';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

const ctx = undefined

export function getCookieValue<T>(key: string, defaultValue: T): T {
  try {
    const item = parseCookies(ctx)?.[key]

    return (item ? JSON.parse(item) : defaultValue) as T;
  } catch (error) {
    console.error(`Erro ao ler nookies key "${key}":`, error);
    return defaultValue;
  }
}
export function setCookieValue<T>(key: string, value: T): void {
  try {
    const options: SerializeOptions = {
      // maxAge: 30 * 24 * 60 * 60,
      maxAge: 60 * 60,
      path: '/',
      // httpOnly: true,
      secure: true
    }
    setCookie(ctx, key, JSON.stringify(value), options);
  } catch (error) {
    console.error(`Erro ao gravar nookies key "${key}":`, error);
  }
}
export function destroyCookieValue(key: string) {
  destroyCookie(ctx, key)
}
