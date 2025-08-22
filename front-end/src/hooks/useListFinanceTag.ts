import { useEffect } from "react"


import { getFinanceTagService } from "@/@features/services/financeTag"
import { useStore } from "@/hooks/useStore"

export function useListFinanceTag(autoHandler: boolean = false) {
  const store = useStore()

  const handler = async ({ typeId }: { typeId?: number } = {}) => {
    const listFinanceTags = store.listFinanceTags

    if (listFinanceTags.length === 0) {
      const newList = await (await getFinanceTagService({ typeId }))

      newList.forEach((item) => listFinanceTags.push(item))
    }

    store.setData({ listFinanceTags })
  }

  useEffect(() => {
    if (autoHandler) {
      handler()
    }
  }, [])

  return {
    list: store.listFinanceTags,
    handler
  }
}
