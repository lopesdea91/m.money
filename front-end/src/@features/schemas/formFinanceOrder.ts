import { z } from "zod";

export const formFinanceOrderSearchSchema = z.object({
  typeId: z.number(),
  active: z.number(),
  tagIds: z.array(z.number()),
  page: z.number(),
  limit: z.number(),
});
export type FormFinanceOrderSearchSchema = z.output<typeof formFinanceOrderSearchSchema>;

export const formFinanceOrderSchema = z.object({
  id: z.string(),
  value: z.string().min(1, { message: "Campo obrigatório" }),
  date: z.string().min(1, { message: "Campo obrigatório" }),
  typeId: z.string().min(1, { message: "Campo obrigatório" }),
  tagIds: z.array(
    z.number()
  ).min(1, { message: "Campo obrigatório" }),
});
export type FormFinanceOrderSchema = z.output<typeof formFinanceOrderSchema>;
