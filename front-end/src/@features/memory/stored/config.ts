export function getStoredValue<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Erro ao ler localStorage key "${key}":`, error);
    return defaultValue;
  }
}
export function setStoredValue<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Erro ao gravar localStorage key "${key}":`, error);
  }
}
export function destroyStoredValue(key: string) {
  window.localStorage.removeItem(key);
}
