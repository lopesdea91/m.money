import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { FormFinanceTagSchema } from "@/@features/schemas/formFinanceTag";
import { useTrigger } from "@/hooks/useTriggers";
import type {
  Features,
  IFormFinanceTagInput,
  IFormFinanceTagValues,
  Store,
} from "@/types";
import sleep from "@/utils/sleep";

export const useFormTagHook = ($store: Store, $features: Features) => {
  const {} = $store;
  const {
    schemas: { formFinanceTagSchema },
    services: {
      updateFinanceTagService,
      createFinanceTagService,
      triggerValue,
      triggerCount,
      addToast,
    },
  } = $features;

  /** form */
  const parseInput = (
    data: Partial<IFormFinanceTagInput> = {}
  ): FormFinanceTagSchema => {
    return {
      id: data?.id?.toString() ?? "",
      name: data?.name ?? "",
      typeId: data?.typeId?.toString() ?? "1",
      active: data?.active?.toString() ?? "1",
    };
  };
  const parseOutput = ({
    id,
    name,
    typeId,
    active,
  }: FormFinanceTagSchema): IFormFinanceTagValues => ({
    id: Number(id),
    name: name,
    typeId: Number(typeId),
    active: Number(active),
  });
  const formTag = useForm({
    resolver: zodResolver(formFinanceTagSchema),
    defaultValues: parseInput(),
  });
  const formTagSetValues = (currentValues: Partial<FormFinanceTagSchema>) => {
    Object.entries(currentValues).forEach(([key, value]) =>
      formTag.setValue(key as keyof FormFinanceTagSchema, value)
    );
  };
  const formTagDefineValues = (data: Partial<IFormFinanceTagInput> = {}) => {
    formTagSetValues(parseInput(data));
  };

  /** events */
  const onSubmit = async () => {
    const values = parseOutput(formTag.getValues());
    const isUpdating = !!values.id;

    try {
      const payload = {
        id: values.id,
        name: values.name,
        typeId: values.typeId,
        active: values.active,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isUpdating
        ? await updateFinanceTagService(payload)
        : await createFinanceTagService(payload);

      await sleep(500);

      addToast({
        message: `Tag ${isUpdating ? "updated" : "created"} successfully`,
      });

      await sleep();

      triggerValue({ modalFormTag: false, modalFormTagData: {} });
      triggerCount("tableTag");
    } catch (error) {
      console.log(error);

      addToast({
        message: `error ${
          isUpdating ? "updating" : "creating"
        }, please try again later`,
        type: "error",
      });
    }
  };

  /** watchs */
  useTrigger<IFormFinanceTagInput>("modalFormTagData", (values) =>
    formTagDefineValues(values)
  );

  return {
    v: formTag.watch(),
    e: formTag.formState.errors,
    s: formTagSetValues,
    d: formTagDefineValues,
    onSubmit: formTag.handleSubmit(() => onSubmit()),
  };
};
