import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from 'dayjs';
import { useForm } from "react-hook-form";

import { formFinanceOrderSchema, type FormFinanceOrderSchema } from "@/@features/schemas/formFinanceOrder";
import type { CB, IFormFinanceOrderInput, IFormFinanceOrderValues } from "@/types";


export const useOrderForm = (callback: CB<IFormFinanceOrderValues>) => {
  const parseInput = (data: Partial<IFormFinanceOrderInput> = {}) => {
    const dateToday = dayjs().format('YYYY-MM-DD')

    return ({
      id: data?.id?.toString() ?? '',
      value: data?.value?.toString() ?? '',
      date: data?.date ?? dateToday,
      typeId: data?.typeId?.toString() ?? '1',
      tagIds: data?.tagIds ?? [],
    })
  }
  const parseOutput = ({ id, value, date, typeId, tagIds }: FormFinanceOrderSchema): IFormFinanceOrderValues => ({
    id: Number(id),
    value: Number(value),
    date: date,
    typeId: Number(typeId),
    tagIds: tagIds
  })

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formFinanceOrderSchema),
    defaultValues: parseInput(),
  });

  const values = watch();

  const setValues = (currentValues: Partial<FormFinanceOrderSchema>) => {
    Object.entries(currentValues).forEach(([key, value]) =>
      setValue(key as keyof FormFinanceOrderSchema, value)
    );
  }

  const defineValues = (data: Partial<IFormFinanceOrderInput> = {}) => {
    console.log('...defineValues', data, parseInput(data));
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
