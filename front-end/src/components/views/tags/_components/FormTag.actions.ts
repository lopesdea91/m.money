import { createFinanceTagService, updateFinanceTagService } from "@/@features/services/financeTag";
import { triggerCount, triggerValue } from "@/@features/services/triggers";
import type { IFormFinanceTagValues } from "@/types";

export async function onSubmit(values: IFormFinanceTagValues) {
  try {
    const data = {
      id: values.id,
      name: values.name,
      typeId: values.typeId,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    values.id
      ? await updateFinanceTagService(data)
      : await createFinanceTagService(data);

    triggerValue({ modalFormTag: false, modalFormTagData: {} });
    triggerCount("modalFormTag");
  } catch (error) {
    console.log(error);
  }
}