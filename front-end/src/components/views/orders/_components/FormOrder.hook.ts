import { zodResolver } from "@hookform/resolvers/zod"
import dayjs from "dayjs"
import { useForm } from "react-hook-form"

import { type FormFinanceOrderSchema } from "@/@features/schemas/formFinanceOrder"
import { useTrigger } from "@/hooks/useTriggers"
import type { Features, IFormFinanceOrderInput, IFormFinanceOrderValues, Store } from "@/types"
import sleep from "@/utils/sleep"

export const useFormOrderHook = ($store: Store, $features: Features) => {
  const { } = $store
  const {
    schemas: { formFinanceOrderSchema },
    services: { updateFinanceOrderService, createFinanceOrderService, triggerValue, triggerCount, addToast },
  } = $features

  /** form */
  const parseInput = (data: Partial<IFormFinanceOrderInput> = {}): FormFinanceOrderSchema => {
    const dateToday = dayjs().format('YYYY-MM-DD')
    return {
      id: data?.id?.toString() ?? '',
      value: data?.value?.toString() ?? '',
      date: data?.date ?? dateToday,
      typeId: data?.typeId?.toString() ?? '1',
      tagIds: data?.tagIds ?? [],
    }
  }
  const parseOutput = ({ id, value, date, typeId, tagIds }: FormFinanceOrderSchema): IFormFinanceOrderValues => ({
    id: Number(id),
    value: Number(value),
    date: date,
    typeId: Number(typeId),
    tagIds: tagIds
  })
  const formOrder = useForm({
    resolver: zodResolver(formFinanceOrderSchema),
    defaultValues: parseInput(),
  });
  const formOrderSetValues = (currentValues: Partial<FormFinanceOrderSchema>) => {
    Object.entries(currentValues).forEach(([key, value]) =>
      formOrder.setValue(key as keyof FormFinanceOrderSchema, value)
    );
  }
  const formOrderDefineValues = (data: Partial<IFormFinanceOrderInput> = {}) => {
    formOrderSetValues(parseInput(data))
  }

  /** events */
  const onSubmit = async () => {
    const values = parseOutput(formOrder.getValues())
    const isUpdating = !!values.id

    try {
      const payload = {
        id: values.id,
        value: values.value,
        date: values.date,
        typeId: values.typeId,
        tagIds: values.tagIds,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isUpdating
        ? await updateFinanceOrderService(payload)
        : await createFinanceOrderService(payload);

      await sleep(500)

      addToast({
        message: `Order ${isUpdating ? 'updated' : 'created'} successfully`
      })

      await sleep()

      triggerValue({ modalFormOrder: false, modalFormOrderData: {} });
      triggerCount("tableOrder");

    } catch (error) {
      console.log(error);

      addToast({
        message: `error ${isUpdating ? 'updating' : 'creating'}, please try again later`,
        type: 'error'
      })
    }
  }

  /** watchs */
  useTrigger<IFormFinanceOrderInput>('modalFormOrderData', (values) => formOrderDefineValues(values))

  return {
    v: formOrder.watch(),
    e: formOrder.formState.errors,
    s: formOrderSetValues,
    d: formOrderDefineValues,
    onSubmit: formOrder.handleSubmit(() => onSubmit()),
  }
}