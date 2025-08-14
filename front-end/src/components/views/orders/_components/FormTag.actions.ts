import { createFinanceOrderService, updateFinanceOrderService } from "@/@features/services/financeOrder/service";
import { triggerCount, triggerValue } from "@/@features/services/triggers";
import type { IFormFinanceOrderValues } from "@/types";

export async function onSubmit(values: IFormFinanceOrderValues) {
  try {
    const data = {
      id: values.id,
      value: values.value,
      date: values.date,
      typeId: values.typeId,
      tagIds: values.tagIds,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    values.id
      ? await updateFinanceOrderService(data)
      : await createFinanceOrderService(data);

    triggerValue({ modalFormOrder: false, modalFormOrderData: {} });
    triggerCount("modalFormOrder");
  } catch (error) {
    console.log(error);
  }
}