import { deleteFinanceOrderService } from "@/@features/services/financeOrder/service";
import { triggerCount, triggerValue } from "@/@features/services/triggers";

export async function onDelete(id: number) {
  try {
    await deleteFinanceOrderService(id)

    triggerValue({
      modalConfirmDelete: false,
      modalConfirmDeleteData: {},
    })
    triggerCount("tableOrder");
  } catch (error) {
    console.log(error);
  }
}