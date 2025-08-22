import { createFinanceOrderService, updateFinanceOrderService } from "@/@features/services/financeOrder/service";
import { addToast } from "@/@features/services/toast";
import { triggerCount, triggerValue } from "@/@features/services/triggers";
import type { IFormFinanceOrderValues } from "@/types";
import sleep from "@/utils/sleep";

export async function onSubmit(values: IFormFinanceOrderValues) {
  const isUpdating = !!values.id

  try {
    const data = {
      id: values.id,
      value: values.value,
      date: values.date,
      typeId: values.typeId,
      tagIds: values.tagIds,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isUpdating
      ? await updateFinanceOrderService(data)
      : await createFinanceOrderService(data);

    await sleep(500)

    addToast({
      message: `Order ${isUpdating ? 'updated' : 'created'} successfully`
    })

    await sleep()

    triggerValue({ modalFormOrder: false, modalFormOrderData: {} });
    triggerCount("tableOrder");

  } catch (error) {
    console.log(error);

    addToast({
      message: `error ${isUpdating ? 'updating' : 'creating'}, please try again later`,
      type: 'error'
    })
  }
}