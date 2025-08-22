import { deepMerge } from "@/utils/deepMerge";

export function getStoredValue<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    const data = item ? JSON.parse(item) : {}

    // return item ? JSON.parse(item) : defaultValue;
    return deepMerge(defaultValue, data) as T

  } catch (error) {
    console.error(`Erro ao ler localStorage key "${key}":`, error);
    return defaultValue;
  }
}
export function setStoredValue<T>(key: string, value: T): void {
  try {
    const old = getStoredValue<T>(key, null as T)

    if (Array.isArray(old))
      window.localStorage.setItem(key, JSON.stringify(value));

    const newValues = deepMerge(old as object, value as object)

    window.localStorage.setItem(key, JSON.stringify(newValues));
  } catch (error) {
    console.error(`Erro ao gravar localStorage key "${key}":`, error);
  }
}
export function destroyStoredValue(key: string) {
  window.localStorage.removeItem(key);
}
