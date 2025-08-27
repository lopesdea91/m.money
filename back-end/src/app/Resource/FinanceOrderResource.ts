import { financeOrderCreateExpectedTypes, financeOrderUpdateExpectedTypes } from "./types";
import validateResourceBody from "./utils";

export const financeOrderResource = {
  create: (data: Record<string, unknown>) => {
    validateResourceBody(financeOrderCreateExpectedTypes, data)
  },
  update: (data: Record<string, unknown>) => {
    validateResourceBody(financeOrderUpdateExpectedTypes, data)
  },
}
