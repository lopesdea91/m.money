import { create } from "zustand"

import type { Auth, Store, StoreData, ToastItem, TriggerValueKeys } from "@/types"
import { deepMerge } from "@/utils/deepMerge"
import type { DeepPartial } from "react-hook-form"
import { initialState } from "./store.content"


export const storeStructure = create<Store>((set, get) => ({
  ...initialState,
  set: (values: DeepPartial<StoreData>) => { set(state => deepMerge<DeepPartial<StoreData>>(state, values)) },
  setData: (values: Partial<StoreData>) => {
    const store = get()

    const auth = {
      id: values.auth?.id || store.auth?.id,
      name: values.auth?.name || store.auth?.name || '',
      email: values.auth?.email || store.auth?.email || ''
    } as Auth

    set(() => ({
      l: { ...store.l, ...values.l },
      auth,
      toast: values.toast || store.toast,
      listFinanceTypes: values.listFinanceTypes ?? store.listFinanceTypes ?? [],
      listFinanceTags: values.listFinanceTags ?? store.listFinanceTags ?? [],
      triggers: { ...store.triggers, ...values.triggers }
    }))
  },
  setAuth: (auth: Auth) => {
    set({ auth })
  },
  setToast: (toast: ToastItem[]) => {
    set({ toast })
  },
  setMonth: (month: string) => {
    set({ month })
  },
  startLoading: (key: string) => {
    set({ l: { [key]: true } })
  },
  endLoading: (key: string) => {
    set({ l: { [key]: false } })
  },
  triggerValue: (key: string, value: unknown) => {
    const { triggers } = get()

    set({ triggers: { ...triggers, [key]: value } })

  },
  triggerCount: (key: TriggerValueKeys) => {
    const { triggers } = get()

    if (typeof triggers?.[key] !== 'number') {
      throw Error('A key informada não é do tipo number')
    }
    const count = (triggers?.[key]) ?? 0

    set({ triggers: { ...triggers, [key]: count + 1 } })
  },
}))

export const getStore = () => {
  const { l, auth, toast, triggers, month, listFinanceTags, listFinanceTypes } = storeStructure.getState()

  return {
    l,
    auth,
    toast,
    triggers,
    month,
    listFinanceTags,
    listFinanceTypes
  }
}
export const setStore = (values: Partial<StoreData>) => {
  storeStructure.setState((state) => ({
    ...state,
    ...values,
    triggers: { ...state.triggers, ...values.triggers }
  }))
}