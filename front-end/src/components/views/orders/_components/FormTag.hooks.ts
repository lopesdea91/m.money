import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { formFinanceOrderSchema, type FormFinanceOrderSchema } from "@/@features/schemas/formFinanceOrder";
import type { FinanceOrder, IFormFinanceOrderValues } from "@/types";

type Callback = (values: IFormFinanceOrderValues) => Promise<void>;

export const useOrderForm = (callback: Callback) => {
  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formFinanceOrderSchema),
    defaultValues: {
      id: "",
      value: "",
      date: "",
      typeId: "",
    },
  });

  const values = watch();

  const setValues = (currentValues: Partial<FormFinanceOrderSchema>) =>
    Object.entries(currentValues).forEach(([key, value]) =>
      setValue(key as keyof FormFinanceOrderSchema, value)
    );

  const defineValues = (data: Partial<FinanceOrder> = {}) => {
    setValues({
      id: data?.id?.toString() ?? '',
      value: data?.value?.toString() ?? '',
      date: data?.date ?? '',
      typeId: data?.typeId?.toString() ?? '',
    })
  }

  const parseOutput = ({ id, value, date, typeId }: FormFinanceOrderSchema): IFormFinanceOrderValues => {
    return {
      id: Number(id),
      value: Number(value),
      date: date,
      typeId: typeId,
      tagIds: []
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
