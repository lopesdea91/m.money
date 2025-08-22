import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

import features from "@/@features"
import type { FormFinanceTagSearchSchema } from "@/@features/schemas/formFinanceTag"
import { storeStructure } from "@/@store"
import { usePageInit } from "@/hooks/usePageInit"
import { useTrigger } from "@/hooks/useTriggers"
import type { Features, FinanceTag, Store } from "@/types"
import { optionsInput } from "@/utils/ui"

export const usePageHook = ({
  listActive,
  listFinanceTypes,
  listLimit
}: Store, {
  memory: { stored },
  schemas: {
    formFinanceTagSearchSchema,
  },
  services: {
    getPaginationFinanceTagService,
    triggerValue,
    triggerCount
  }
}: Features) => {

  /** FORM SEARCH */
  const formSearch = useForm<FormFinanceTagSearchSchema>({
    resolver: zodResolver(formFinanceTagSearchSchema),
    defaultValues: stored.pageTagSearch().map(({ typeId, active }) => ({
      typeId: typeId?.toString(),
      active: active?.toString(),
    }))
  })
  const formSearchSetValues = (currentValues: Partial<FormFinanceTagSearchSchema>) => {
    Object.entries(currentValues).forEach(([key, value]) => {
      stored.pageTagSearch().set({
        [key as keyof FormFinanceTagSearchSchema]: value
      })
      formSearch.setValue(key as keyof FormFinanceTagSearchSchema, value)
    });

    triggerCount("tableTag");
  }

  /** TABLE */
  const [tableData, setDataTable] = useState<{
    items: FinanceTag[];
    perPage: number;
    currentPage: number;
    lastPages: number;
    total: number;
  }>(() => {
    const { page, limit } = stored.pageTagSearch().get();
    return { items: [], perPage: limit!, currentPage: page!, lastPages: 1, total: 0 };
  });
  const fetchTable = async () => {
    try {
      const { page, limit, ...search } = stored.pageTagSearch().get();

      const { items, lastPages, total } = await getPaginationFinanceTagService({
        page, limit, ...search
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

  /** watchs */
  usePageInit({ title: "Tags", cb: fetchTable });
  useTrigger("tableTag", () => fetchTable());

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
      stored: stored.pageTagSearch
    },
    triggerValue,
    triggerCount
  }
}
export const useTagPageHook = () => usePageHook(storeStructure.getState(), features)
