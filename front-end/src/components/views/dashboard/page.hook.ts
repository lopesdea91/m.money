import { useRef, useState } from "react"

import features from "@/@features"
import { getFinanceOrderService } from "@/@features/services/financeOrder/service"
import { storeStructure } from "@/@store"
import { usePageInit } from "@/hooks/usePageInit"
import { useWatch } from "@/hooks/useWatch"
import type { ChartPieType, Features, Store, SumTagValue, SumTypeValue } from "@/types"
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
  const isMounted = useRef<boolean>(false)

  const [dashData, setDataDash] = useState<{
    sumTypesCards: SumTypeValue[],
    sumTags: SumTagValue[],
    chartRevenues: ChartPieType[],
    chartExpenses: ChartPieType[],
  }>({
    sumTypesCards: [],
    sumTags: [],
    chartRevenues: [],
    chartExpenses: [],
  });

  const fetchData = async () => {
    try {
      const items = await getFinanceOrderService({
        month, active: 1
      })
      const { sumTypesCards, sumTags, chartRevenues, chartExpenses } = renderData(items || [])

      setDataDash({
        sumTypesCards, sumTags, chartRevenues, chartExpenses
      })
    } catch (error) {
      console.log(error);
    }
  }

  /** watchs */
  useWatch(month, () => {
    if (!isMounted.current) return

    fetchData()
  });

  usePageInit({
    title: "Dashboard", cb: () => {
      isMounted.current = true

      fetchData()
    }
  });

  return {
    triggerValue,
    month,
    data: dashData,
    tableOrder: {
      stored: stored.pageOrderSearch
    }
  }
}
export const useDashboardPageHook = () => usePageHook(storeStructure(), features)
