import { financeTagCreateExpectedTypes, financeTagUpdateExpectedTypes } from "./types";
import validateResourceBody from "./utils";

export const financeTagResource = {
  create: (data: Record<string, unknown>) => {
    validateResourceBody(financeTagCreateExpectedTypes, data)
  },
  update: (data: Record<string, unknown>) => {
    validateResourceBody(financeTagUpdateExpectedTypes, data)
  },
}
