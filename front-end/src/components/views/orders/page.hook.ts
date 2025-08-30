
import { usePageInit } from "@/hooks/usePageInit"
import type { Features, Store } from "@/types"
import { optionsInput } from "@/utils/ui"
import { useFilterOrderHook } from "./_components/FilterOrder.hook"
import { useFormOrderHook } from "./_components/FormOrder.hook"
import { useModalDeleteOrderHook } from "./_components/ModalDeleteOrder.hook"
import { useTableOrderHook } from "./_components/TableOrder.hook"

export const useOrderPageHook = ($store: Store, $features: Features) => {
  const filterOrder = useFilterOrderHook($store, $features)
  const tableOrder = useTableOrderHook($store, $features)
  const formOrder = useFormOrderHook($store, $features)
  const modalDeleteOrder = useModalDeleteOrderHook($store, $features)

  const {
    listActive,
    listFinanceTypes,
    listLimit,
  } = $store
  const {
    services: { triggerValue, triggerCount, }
  } = $features

  usePageInit({
    title: "Orders", cb: async () => { }
  });

  return {
    filterOrder: {
      ...filterOrder,
      onClose: () => triggerValue({ modalFilterOrder: false })
    },
    tableOrder: {
      ...tableOrder,
    },
    formOrder: {
      ...formOrder,
      onClose: () => triggerValue({ modalFormOrder: false })
    },
    modalDeleteOrder: {
      ...modalDeleteOrder,
      onClose: () => triggerValue({ modalConfirmDelete: false })
    },
    listActive: listActive.map(optionsInput),
    listFinanceTypes: listFinanceTypes.map(optionsInput),
    listLimit: listLimit.map(optionsInput),
    triggerValue,
    triggerCount,
  }
} 