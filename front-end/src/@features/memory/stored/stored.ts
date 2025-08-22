
import type { FinanceType } from "@/types";
import dayjs from "dayjs";
import { destroyStoredValue, getStoredValue, setStoredValue } from "./config";

function baseStored<T>(key: string, defaultValue: T) {
  return {
    get: () => getStoredValue(key, defaultValue),
    set: (value: Partial<T>) => setStoredValue(key, value),
    destroy: () => destroyStoredValue(key),
    map: <R>(cb: (value: T) => void): R => cb(getStoredValue(key, defaultValue)) as R
  }
}

export const appStored = () => baseStored<{ month?: string }>('app', {
  month: dayjs().format('YYYY-MM')
})
export const orderTypeStored = () => baseStored<FinanceType[]>('list.orderType', [])
export const pageTagSearchStored = () => baseStored<{
  typeId?: number;
  active?: number
  limit: number
  page: number
}>('pageTagSearch', {
  typeId: 1,
  active: 1,
  limit: 10,
  page: 1
})
export const pageOrderSearchStored = () => baseStored<{
  typeId?: number;
  tagIds?: number[],
  active?: number
  limit: number
  page: number
}>('pageOrderSearch', {
  active: 1,
  limit: 10,
  page: 1
})

export const stored = {
  app: appStored,
  orderType: orderTypeStored,
  pageTagSearch: pageTagSearchStored,
  pageOrderSearch: pageOrderSearchStored,
}