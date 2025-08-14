import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formFinanceTagSchema, type FormFinanceTagSchema } from "@/@features/schemas/formFinanceTag";
import type { FinanceTag, IFormFinanceTagValues } from "@/types";

type Callback = (values: IFormFinanceTagValues) => Promise<void>;

export const useTagForm = (callback: Callback) => {
  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formFinanceTagSchema),
    defaultValues: {
      id: "",
      name: "",
      typeId: "",
    },
  });

  const values = watch();

  const setValues = (currentValues: Partial<FormFinanceTagSchema>) =>
    Object.entries(currentValues).forEach(([key, value]) =>
      setValue(key as keyof FormFinanceTagSchema, value)
    );

  const defineValues = (data: Partial<FinanceTag> = {}) => {
    setValues({
      id: data?.id?.toString() ?? '',
      name: data?.name ?? '',
      typeId: data?.typeId?.toString() ?? '',
    })
  }

  const parseOutput = ({ id, name, typeId }: FormFinanceTagSchema): IFormFinanceTagValues => {
    return {
      id: Number(id),
      name: name,
      typeId: Number(typeId),
    }
  }

  return {
    values,
    errors,
    setValues,
    handleSubmit: handleSubmit((data) => callback(parseOutput(data))),
    defineValues
  };
};
