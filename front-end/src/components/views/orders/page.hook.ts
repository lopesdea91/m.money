import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import features from "@/@features"
import type { FormFinanceOrderSearchSchema } from "@/@features/schemas/formFinanceOrder"
import { storeStructure } from "@/@store"
import { usePageInit } from "@/hooks/usePageInit"
import { useTrigger } from "@/hooks/useTriggers"
import { useWatch } from "@/hooks/useWatch"
import type { Features, FinanceOrder, Store } from "@/types"
import { optionsInput } from "@/utils/ui"


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

  /** FORM SEARCH */
  const formSearch = useForm<FormFinanceOrderSearchSchema>({
    resolver: zodResolver(formFinanceOrderSearchSchema),
    defaultValues: stored.pageOrderSearch().map(({ typeId, active, tagIds }) => ({
      tagIds: tagIds?.map(e => e.toString()),
      typeId: typeId?.toString(),
      active: active?.toString(),
    }))
  })
  const formSearchSetValues = (currentValues: Partial<FormFinanceOrderSearchSchema>) => {
    Object.entries(currentValues).forEach(([key, value]) => {
      stored.pageOrderSearch().set({
        [key as keyof FormFinanceOrderSearchSchema]: value
      })
      formSearch.setValue(key as keyof FormFinanceOrderSearchSchema, value)
    });

    triggerCount("tableOrder");
  }

  /** TABLE */
  const [tableData, setDataTable] = useState<{
    items: FinanceOrder[];
    perPage: number;
    currentPage: number;
    lastPages: number;
    total: number;
  }>(() => {
    const { page, limit } = stored.pageOrderSearch().get();
    return { items: [], perPage: limit!, currentPage: page!, lastPages: 1, total: 0 };
  });
  const fetchTable = async () => {
    try {
      const { page, limit, ...search } = stored.pageOrderSearch().get();

      const { items, lastPages, total } = await getPaginationFinanceOrderService({
        page, limit, month, ...search
      })

      setDataTable({
        items,
        lastPages,
        total,
        currentPage: page,
        perPage: limit
      })

    } catch (error) {
      console.log(error);
    }
  }
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

  /** watchs */
  usePageInit({ title: "Orders", cb: fetchTable });
  useTrigger("tableOrder", () => fetchTable());
  useWatch(month, () => fetchTable());

  return {
    listActive: listActive.map(optionsInput),
    listFinanceTypes: listFinanceTypes.map(optionsInput),
    listLimit: listLimit.map(optionsInput),
    formSearch: {
      s: formSearchSetValues,
      v: formSearch.watch(),

    },
    table: {
      v: tableData,
      s: setDataTable,
      stored: stored.pageOrderSearch,

    },
    triggerValue,
    triggerCount,
    confirmDelete: {
      modalConfirmDeleteData,
      onDelete,
    }
  }
}
export const useOrderPageHook = () => usePageHook(storeStructure.getState(), features)
