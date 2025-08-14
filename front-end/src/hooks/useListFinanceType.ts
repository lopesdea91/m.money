import { useEffect } from "react"

import { orderTypeStored } from "@/@features/memory/stored/stored"
import { getFinanceTypeService } from "@/@features/services/financeType/service"
import { useStore } from "@/hooks/useStore"

export function useListFinanceType(autoHandler: boolean = true) {
  const store = useStore()

  const handler = async () => {
    const listFinanceTypes = orderTypeStored().get()

    if (listFinanceTypes.length === 0) {
      const newList = await getFinanceTypeService()

      newList.forEach((item) => listFinanceTypes.push(item))
    }

    store.setData({ listFinanceTypes })
  }

  useEffect(() => {
    if (autoHandler) {
      handler()
    }
  }, [])

  return {
    list: store.listFinanceTypes,
    handler
  }
}
