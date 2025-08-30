import type { Features, Store } from "@/types"

export const useModalDeleteOrderHook = ($store: Store, $features: Features) => {
  const {
    triggers: { modalConfirmDeleteData }
  } = $store
  const {
    services: { deleteFinanceOrderService, triggerValue, triggerCount }
  } = $features

  /** events */
  const onDelete = async () => {
    try {
      await deleteFinanceOrderService(Number(modalConfirmDeleteData?.id))

      triggerValue({
        modalConfirmDelete: false,
        modalConfirmDeleteData: {},
      })
      triggerCount("tableOrder");
    } catch (error) {
      console.log(error);
    }
  }

  return {
    onDelete
  }
}