import {
  formFinanceTagSearchSchema,
  type FormFinanceTagSearchSchema,
} from "@/@features/schemas/formFinanceTag";
import type { Features, Store } from "@/types";

export const useFilterTagHook = ($store: Store, $features: Features) => {
  const {
    set,
    pages: { tags: pageTags },
  } = $store;
  const {
    services: { triggerCount },
  } = $features;

  /** events */
  const onSearch = () => {
    const safe = formFinanceTagSearchSchema.safeParse(pageTags.filter);

    console.log(safe);

    // if (safe.error) {
    //  // errors
    //   return;
    // }

    // success
    triggerCount("tableTag");
  };

  return {
    v: { ...pageTags.filter },
    s: (values: Partial<FormFinanceTagSearchSchema>) =>
      set({ pages: { tags: { filter: { ...values } } } }),
    onSearch,
  };
};
