import z from "zod";

export const formLoginSchema = z.object({
  email: z.string().min(1, { message: "Campo obrigatório" }),
  password: z.string().min(6, { message: "Campo obrigatório" }),
});
export type FormLoginSchema = z.output<typeof formLoginSchema>;
