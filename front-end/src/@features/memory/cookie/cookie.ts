import { destroyCookieValue, getCookieValue, setCookieValue } from "./config"

function baseStored<T>(key: string, defaultValue: T) {
  return {
    get: () => getCookieValue(key, defaultValue),
    set: (value: T) => setCookieValue(key, value),
    destroy: () => destroyCookieValue(key),
  }
}

export const authCookie = baseStored('auth', { token: '' })