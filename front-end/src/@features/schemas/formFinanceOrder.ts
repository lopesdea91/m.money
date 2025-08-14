import { z } from "zod";

export const formFinanceOrderSchema = z.object({
  id: z.string(),
  value: z.string().min(1, { message: "Campo obrigatório" }),
  date: z.string().min(1, { message: "Campo obrigatório" }),
  typeId: z.string().min(1, { message: "Campo obrigatório" }),
  // tagIds: z.string().min(1, { message: "Campo obrigatório" }),
});

export type FormFinanceOrderSchema = z.output<typeof formFinanceOrderSchema>;
