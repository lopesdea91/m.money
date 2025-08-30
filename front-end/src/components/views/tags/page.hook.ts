
import type { Features, Store } from "@/types"
import { optionsInput } from "@/utils/ui"
import { useFilterTagHook } from "./_components/FilterTag.hook"
import { useFormTagHook } from "./_components/FormTag.hook"
import { useTableTagHook } from "./_components/TableTags.hook"

export const useTagPageHook = ($store: Store, $features: Features) => {
  const filterTag = useFilterTagHook($store, $features)
  const tableTag = useTableTagHook($store, $features)
  const formTag = useFormTagHook($store, $features)

  const {
    listActive,
    listFinanceTypes,
    listLimit
  } = $store
  const {
    services: { triggerValue, triggerCount, }
  } = $features

  return {
    filterTag: {
      ...filterTag,
      onClose: () => triggerValue({ modalFilterTag: false })
    },
    tableTag: {
      ...tableTag
    },
    formTag: {
      ...formTag,
      onClose: () => triggerValue({ modalFormTag: false })
    },
    listActive: listActive.map(optionsInput),
    listFinanceTypes: listFinanceTypes.map(optionsInput),
    listLimit: listLimit.map(optionsInput),
    triggerValue,
    triggerCount
  }
}