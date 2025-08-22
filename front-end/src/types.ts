import type features from "./@features";

export type CB<T> = (values: T) => Promise<void>;

/** TRIGGERS */
export type TriggerValue = {
  /** geral */
  modalConfirmDelete: boolean
  modalConfirmDeleteData: Record<string, unknown>

  /** page TAG */
  tableTag: number
  modalFormTag: boolean
  modalFormTagData: Partial<FinanceTag>
  /** page ORDER */
  tableOrder: number
  modalFormOrder: boolean
  modalFormOrderData: Partial<FinanceOrder>
}
export type TriggerValueKeys = keyof TriggerValue


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
  triggers: Partial<TriggerValue>
  month: string
  listFinanceTypes: FinanceType[]
  listFinanceTags: FinanceTag[]
  listActive: { id: number; name: string }[]
  listLimit: { id: number; name: string }[]
}
export type StoreActions = {
  setData: (values: Partial<StoreData>) => void
  setAuth: (params: Auth) => void
  setToast: (toast: ToastItem[]) => void
  setMonth: (month: string) => void
  startLoading: (key: string) => void
  endLoading: (key: string) => void
}
export type Store = StoreData & StoreActions

/** FEATURES */
export type Features = typeof features


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
  month: string
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
  active: number
  userId: number
}


/** FORMS */
export type IFormFinanceTagInput = {
  id: number | null;
  name: string;
  typeId: number;
}
export type IFormFinanceTagValues = {
  id: number;
  name: string;
  typeId: number;
}
export type IFormFinanceOrderInput = {
  id: number
  value: number
  date: string
  typeId: string
  tagIds: number[]
}
export type IFormFinanceOrderValues = {
  id: number
  value: number
  date: string
  typeId: number
  tagIds: number[]
  // active: number
  // userId: number
}


/** DASH */
export type SumTypeValue = {
  label: string
  value: number
  slug: string
}
export type SumTagValue = {
  key: string
  value: number
  typeId: number
  tags: { id: number, name: string }[]
  tagIds: number[]
}