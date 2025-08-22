import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectRoot } from "@/components/ui/select";
import { useTrigger } from "@/hooks/useTriggers";
import type { IFormFinanceOrderInput } from "@/types";
import { filterTagByTypeId, formatTagsIds } from "@/utils/financeOrder";
import { useOrderPageContext } from "../page.context";
import { onSubmit } from "./FormOrder.actions";
import { useOrderForm } from "./FormOrder.hooks";

const FormOrder = () => {
  const { listFinanceTypes, triggerValue } = useOrderPageContext();

  const { values, errors, setValues, defineValues, handleSubmit } =
    useOrderForm(onSubmit);

  useTrigger<IFormFinanceOrderInput>("modalFormOrderData", (payload) => {
    defineValues(payload);
  });

  return (
    <>
      {/* <Pre data={values}></Pre> */}

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <InputRoot>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={values.value}
              onChange={({ target }) => setValues({ value: target.value })}
              errorMessage={errors.value?.message}
              type="number"
              step="0.01"
            />
          </InputRoot>

          <InputRoot>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={values.date}
              onChange={({ target }) => setValues({ date: target.value })}
              errorMessage={errors.date?.message}
              type="date"
            />
          </InputRoot>

          <SelectRoot>
            <Label htmlFor="typeId">Type</Label>
            <Select
              value={values.typeId}
              onChange={(value) => setValues({ typeId: value, tagIds: [] })}
              options={listFinanceTypes}
              errorMessage={errors.typeId?.message}
            />
          </SelectRoot>
        </div>

        <InputRoot className="mb-6">
          <Label htmlFor="tags" className="min-h-[16px]">
            Tags{" "}
            <span className="font-thin text-xs">
              {formatTagsIds(values.tagIds)}
            </span>
          </Label>

          <div className="grid grid-cols-3 gap-2 p-2 bg-black/5 rounded border">
            {filterTagByTypeId(values.typeId).map((tag) => (
              <Label
                htmlFor={`tags-[${tag.id}]`}
                key={tag.id}
                className="flex items-center justify-start gap-2 border p-2 cursor-pointer bg-white rounded"
              >
                <Input
                  className="h-min w-min border-0"
                  id={`tags-[${tag.id}]`}
                  checked={!!values.tagIds.includes(tag.id)}
                  onChange={({ target }) => {
                    const tagIds = target.checked
                      ? [...values.tagIds, tag.id]
                      : [...values.tagIds.filter((v) => v !== tag.id)];

                    setValues({ tagIds });
                  }}
                  type="checkbox"
                />
                <span>{tag.name}</span>
              </Label>
            ))}
          </div>

          {errors.tagIds?.message && (
            <span className="lowercase text-red-600 font-bold italic text-sm -mt-2 mx-1">
              {errors.tagIds?.message}
            </span>
          )}

          {!values.typeId && (
            <span className="lowercase text-neutral-800 italic text-sm -mt-2 mx-1">
              Selecione o Type para visualizar as tags
            </span>
          )}
        </InputRoot>

        <div className="flex items-center justify-end gap-2 border-t pt-4">
          <Button
            type="button"
            onClick={() => triggerValue({ modalFormOrder: false })}
            variant="outline"
          >
            Cancel
          </Button>
          <Button type="submit">{values.id ? "Save" : "Create"}</Button>
        </div>
      </form>
    </>
  );
};

export default FormOrder;
