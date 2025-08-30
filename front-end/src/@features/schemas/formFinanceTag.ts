import { z } from "zod";

export const formFinanceTagSearchSchema = z.object({
  typeId: z.number(),
  active: z.number(),
  page: z.number(),
  limit: z.number(),
});
export type FormFinanceTagSearchSchema = z.output<typeof formFinanceTagSearchSchema>;

export const formFinanceTagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Campo obrigatório" }),
  typeId: z.string().min(1, { message: "Campo obrigatório" }),
  active: z.string().min(1, { message: "Campo obrigatório" }),
});
export type FormFinanceTagSchema = z.output<typeof formFinanceTagSchema>;
