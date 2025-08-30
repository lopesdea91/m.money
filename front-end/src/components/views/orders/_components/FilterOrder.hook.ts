import { formFinanceOrderSearchSchema, type FormFinanceOrderSearchSchema } from "@/@features/schemas/formFinanceOrder"
import type { Features, Store } from "@/types"


export const useFilterOrderHook = ($store: Store, $features: Features) => {
  const {
    set,
    pages: { orders: pageOrders }
  } = $store
  const {
    services: { triggerCount }
  } = $features

  /** events */
  const onSearch = () => {
    const safe = formFinanceOrderSearchSchema.safeParse(pageOrders.filter)

    console.log(safe);

    // if (safe.error) {
    // // errors
    //   return
    // }

    // success
    triggerCount('tableOrder')
  }

  return {
    v: { ...pageOrders.filter },
    s: (values: Partial<FormFinanceOrderSearchSchema>) => set({ pages: { orders: { filter: { ...values } } } }),
    onSearch
  }
}