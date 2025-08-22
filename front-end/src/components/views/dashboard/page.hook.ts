import { useState } from "react"

import features from "@/@features"
import { getFinanceOrderService } from "@/@features/services/financeOrder/service"
import { storeStructure } from "@/@store"
import { useStore } from "@/hooks/useStore"
import { useWatch } from "@/hooks/useWatch"
import type { Features, Store, SumTagValue, SumTypeValue } from "@/types"
import { renderData } from "./page.utils"

export const usePageHook = ({
  listActive,
  listFinanceTypes,
  listLimit,
  month,
  triggers: { modalConfirmDeleteData }
}: Store, {
  memory: { stored },
  schemas: {
    formFinanceOrderSearchSchema,
  },
  services: {
    getPaginationFinanceOrderService,
    deleteFinanceOrderService,
    triggerValue,
    triggerCount
  }
}: Features) => {
  useStore()
  const [dashData, setDataDash] = useState<{
    sumTypes: SumTypeValue[],
    sumTags: SumTagValue[],
  }>({
    sumTags: [],
    sumTypes: []
  });

  const fetchData = async () => {
    try {
      const items = await getFinanceOrderService({
        month, active: 1
      })
      console.log({ items });
      setDataDash(renderData(items || []))
    } catch (error) {
      console.log(error);
    }
  }

  /** watchs */
  // usePageInit({ title: "Dashboard", cb: fetchData });
  // useTrigger("tableOrder", () => fetchData());
  useWatch(month, () => fetchData());

  return {
    triggerValue,
    month,
    data: dashData,
    tableOrder: {
      stored: stored.pageOrderSearch
    }
  }
}
export const useDashboardPageHook = () => usePageHook(storeStructure.getState(), features)
