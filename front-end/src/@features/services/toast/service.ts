import { getStore, setStore } from "@/@store"
import type { ToastItem, ToastItemKey } from "@/types"

const getToasts = () => getStore().toast

const sabeToasts = (toast: ToastItem[]) => setStore({ toast })

export const addToast = ({ message, type = 'success', key: _key = 'global' }: { message: string, type?: string, key?: ToastItemKey }) => {
  const toasts = getToasts()

  const _id = (new Date()).getTime()

  const newToast: ToastItem = {
    _id,
    _key,
    message,
    type,
  }
  sabeToasts([...toasts, newToast])
}

export const removeToast = (_id: number) => {
  const toasts = getToasts().filter(el => el._id !== _id)
  sabeToasts(toasts)
}

export const removeToastByKey = (key: ToastItemKey) => {
  const toasts = getToasts().filter(el => el._key !== key)
  sabeToasts(toasts)
}

export const cleanToast = () => {
  sabeToasts([])
}
