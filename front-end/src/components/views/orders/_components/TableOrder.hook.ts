import { useRef } from 'react';

import { useTrigger } from '@/hooks/useTriggers';
import { useWatch } from '@/hooks/useWatch';
import type { Features, FinanceOrder, Store } from '@/types';

export const useTableOrderHook = ($store: Store, $features: Features) => {
  const {
    set,
    month,
    pages: { orders: pageOrder },
  } = $store
  const {
    services: { getPaginationFinanceOrderService, triggerValue, triggerCount },
  } = $features

  const isMounted = useRef(false)

  /** events */
  const onFetchData = async () => {
    try {
      const { active, tagIds, typeId, page, limit } = pageOrder.filter

      const { items, lastPage, total } = await getPaginationFinanceOrderService({ active, tagIds, typeId, page, limit, month })

      set({
        pages: {
          orders: {
            table: { items, lastPage, total },
          }
        },
      })
    } catch (error) {
      console.log(error);
    }
  }
  const onDelete = (orderId: number) => {
    triggerValue({
      modalConfirmDelete: true,
      modalConfirmDeleteData: { id: orderId },
    })
  }
  const onEdit = (order: FinanceOrder) => {
    triggerValue({
      modalFormOrder: true,
      modalFormOrderData: order,
    });
  }
  const onLimit = (limit: number) => {
    set({
      pages: { orders: { filter: { limit, page: 1 } } }
    })
    triggerCount('tableOrder')
  }
  const onChangePage = (page: number) => {
    set({
      pages: { orders: { filter: { page } } }
    })
    triggerCount('tableOrder')
  }

  /** watchs */
  useWatch(month, async () => {
    if (!isMounted.current) return
    await onFetchData()
  });
  useTrigger("tableOrder", async () => {
    isMounted.current = true
    await onFetchData()
  });

  return {
    v: pageOrder.table,
    onFetchData,
    onDelete,
    onEdit,
    onLimit,
    onChangePage
  }
}
