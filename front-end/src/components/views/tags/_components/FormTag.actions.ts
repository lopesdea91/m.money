import { createFinanceTagService, getFinanceTagService, updateFinanceTagService } from "@/@features/services/financeTag";
import { addToast } from "@/@features/services/toast";
import { triggerCount, triggerValue } from "@/@features/services/triggers";
import { setStore } from "@/@store";
import type { IFormFinanceTagValues } from "@/types";
import sleep from "@/utils/sleep";

export async function onSubmit(values: IFormFinanceTagValues) {
  const isUpdating = !!values.id

  try {
    const data = {
      id: values.id,
      name: values.name,
      typeId: values.typeId,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isUpdating
      ? await updateFinanceTagService(data)
      : await createFinanceTagService(data);

    await sleep(500)

    addToast({
      message: `Tag ${isUpdating ? 'updated' : 'created'} successfully`
    })

    /** update tags */
    const listFinanceTags = await getFinanceTagService()
    setStore({ listFinanceTags })

    /** close modal */
    triggerValue({ modalFormTag: false, modalFormTagData: {} });
    triggerCount("tableTag");

  } catch (error) {
    console.log(error);

    addToast({
      message: `error ${isUpdating ? 'updating' : 'creating'}, please try again later`,
      type: 'error'
    })
  }
}