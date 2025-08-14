/** TRIGGERS */
export type TriggerValue = {
  modalFormTag: boolean
  modalFormTagData: Partial<FinanceTag>
  modalFormOrder: boolean
  modalFormOrderData: Partial<FinanceOrder>
}
export type TriggerCount = 'modalFormTag' | 'modalFormOrder'

/** TOAST */
export type ToastItemKey = string

export type ToastItem = {
  _id: number
  _key: ToastItemKey
  type: string
  message: string
}


/** STORE */
export type StoreData = {
  l: IsLoading
  auth: Auth
  toast: ToastItem[]
  triggers: Record<string, unknown>
  listFinanceTypes: FinanceType[]
  listFinanceTags: FinanceTag[]
}
export type StoreActions = {
  setData: (values: Partial<StoreData>) => void
  setAuth: (params: Auth) => void
  setToast: (toast: ToastItem[]) => void
  startLoading: (key: string) => void
  endLoading: (key: string) => void
}
export type Store = StoreData & StoreActions


/** DOMAIN */
export type IsLoading = Record<string, boolean>
export type Auth = {
  id: number
  email: string
  name: string
}
export type FinanceOrder = {
  id: number
  value: number
  date: string
  type: { id: number; name: string }
  typeId: number
  tagIds: number[]
  tags: { id: number; name: string }[]
  active: number
  userId: number
}
export type FinanceType = {
  id: number
  name: string
}
export type FinanceTag = {
  id: number
  name: string
  type: { id: number; name: string }
  typeId: number
  userId: number
}


/** FORMS */
export type IFormFinanceTagValues = {
  id: number;
  name: string;
  typeId: number;
}
export type IFormFinanceOrderValues = {
  id: number
  value: number
  date: string
  typeId: string
  tagIds: string[]
  // active: number
  // userId: number
}