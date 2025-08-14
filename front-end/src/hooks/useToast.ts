import { addToast, cleanToast, removeToast } from "@/@features/services/toast/service"
import { storeStructure } from '@/@store'
import type { ToastItemKey } from "@/types"

export default function useToast({ key }: { key?: ToastItemKey } = {}) {
  const store = storeStructure()

  const items = store.toast
  const itemsTo = items.filter((el) => el._key === key)

  /** management toast TO */
  const removeToastByTo = () => {
    const items = store.toast.filter(el => el._key !== key)
    store.setToast(items)
  }
  const cleanByTo = () => {
    const items = store.toast.filter(el => el._key !== key)
    store.setToast(items)
  }

  return {
    itemsTo,
    removeToastByTo,
    cleanByTo,
    items,
    add: addToast,
    remove: removeToast,
    clean: cleanToast,
  }
}
