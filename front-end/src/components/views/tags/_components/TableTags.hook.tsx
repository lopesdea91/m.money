import { useRef } from "react";

import { useTrigger } from "@/hooks/useTriggers";
import { useWatch } from "@/hooks/useWatch";
import type { Features, FinanceTag, Store } from "@/types";

export const useTableTagHook = ($store: Store, $features: Features) => {
  const {
    set,
    month,
    pages: { tags: pageTag },
  } = $store;
  const {
    services: { getPaginationFinanceTagService, triggerValue, triggerCount },
  } = $features;

  const isMounted = useRef(false);

  /** events */
  const onFetchData = async () => {
    try {
      const { active, typeId, page, limit } = pageTag.filter;

      const { items, lastPage, total } = await getPaginationFinanceTagService({
        active,
        typeId,
        page,
        limit,
      });

      set({
        pages: {
          tags: {
            table: { items, lastPage, total },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = (tag: FinanceTag) => {
    triggerValue({
      modalFormTag: true,
      modalFormTagData: tag,
    });
  };
  const onLimit = (limit: number) => {
    set({
      pages: { tags: { filter: { limit, page: 1 } } },
    });
    triggerCount("tableTag");
  };
  const onChangePage = (page: number) => {
    set({
      pages: { tags: { filter: { page } } },
    });
    triggerCount("tableTag");
  };

  /** watchs */
  useWatch(month, async () => {
    if (!isMounted.current) return;
    await onFetchData();
  });
  useTrigger("tableTag", async () => {
    isMounted.current = true;
    await onFetchData();
  });

  return {
    v: pageTag.table,
    onFetchData,
    onEdit,
    onLimit,
    onChangePage,
  };
};
