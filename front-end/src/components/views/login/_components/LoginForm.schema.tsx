import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().min(1, { message: "Campo obrigatório" }),
  password: z.string().min(1, { message: "Campo obrigatório" }),
});

type Schema = z.output<typeof schema>;

export const useLoginForm = () => {
  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "user1@email.com",
      password: "123456",
    },
  });

  const values = watch();

  const setValues = (currentValues: Partial<Schema>) =>
    Object.entries(currentValues).forEach(([key, value]) =>
      setValue(key as keyof Schema, value)
    );

  return { values, errors, handleSubmit, setValues };
};
