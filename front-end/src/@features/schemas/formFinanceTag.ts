import { z } from "zod";

export const formFinanceTagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Campo obrigatório" }),
  typeId: z.string().min(1, { message: "Campo obrigatório" }),
});

export type FormFinanceTagSchema = z.output<typeof formFinanceTagSchema>;
