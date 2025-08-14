import { create } from "zustand"

import type { Auth, Store, StoreData, ToastItem } from "@/types"

const initialState: StoreData = {
  l: {},
  auth: {} as Auth,
  toast: [],
  triggers: {},
  listFinanceTypes: [],
  listFinanceTags: [],
}

export const storeStructure = create<Store>((set, get) => ({
  ...initialState,
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
    }))
  },
  setAuth: (auth: Auth) => {
    set({ auth })
  },
  setToast: (toast: ToastItem[]) => {
    set({ toast })
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
  triggerCount: (key: string) => {
    const { triggers } = get()

    if (typeof triggers?.[key] !== 'number') {
      throw Error('A key informada não é do tipo number')
    }
    const count = (triggers?.[key]) ?? 0

    set({ triggers: { ...triggers, [key]: count + 1 } })
  },
}))

export const getStore = () => {
  const { l, auth, toast, triggers, listFinanceTags, listFinanceTypes } = storeStructure.getState()

  return {
    l,
    auth,
    toast,
    triggers,
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