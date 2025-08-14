
import type { FinanceType } from "@/types";
import { destroyStoredValue, getStoredValue, setStoredValue } from "./config";

function baseStored<T>(key: string, defaultValue: T) {
  return {
    get: () => getStoredValue(key, defaultValue),
    set: (value: T) => setStoredValue(key, value),
    destroy: () => destroyStoredValue(key),
  }
}

export const orderTypeStored = () => baseStored<FinanceType[]>('list.orderType', [])