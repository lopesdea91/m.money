import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formFinanceTagSchema, type FormFinanceTagSchema } from "@/@features/schemas/formFinanceTag";
import type { CB, IFormFinanceTagInput, IFormFinanceTagValues } from "@/types";

export const useTagForm = (callback: CB<IFormFinanceTagValues>) => {
  const parseInput = (data: Partial<IFormFinanceTagInput> = {}) => ({
    id: data?.id?.toString() ?? '',
    name: data?.name ?? '',
    typeId: data?.typeId?.toString() ?? '2',
  })

  const parseOutput = ({ id, name, typeId }: FormFinanceTagSchema): IFormFinanceTagValues => ({
    id: Number(id),
    name: name,
    typeId: Number(typeId),
  })

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formFinanceTagSchema),
    defaultValues: parseInput()
  });

  const values = watch();

  const setValues = (currentValues: Partial<FormFinanceTagSchema>) => {
    Object.entries(currentValues).forEach(([key, value]) =>
      setValue(key as keyof FormFinanceTagSchema, value)
    );
  }

  const defineValues = (data: Partial<IFormFinanceTagInput> = {}) => {
    setValues(parseInput(data))
  }

  return {
    values,
    errors,
    setValues,
    handleSubmit: handleSubmit((data) => callback(parseOutput(data))),
    defineValues
  };
};
