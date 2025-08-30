import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectRoot } from "@/components/ui/select";
import { filterTagByTypeId, formatTagsIds } from "@/utils/financeOrder";
import { useOrderPageContext } from "../page.context";

const FormOrder = () => {
  const { formOrder, listFinanceTypes } = useOrderPageContext();

  return (
    <form onSubmit={formOrder.onSubmit}>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <InputRoot>
          <Label htmlFor="value">Value</Label>
          <Input
            id="value"
            value={formOrder.v.value}
            onChange={({ target }) => formOrder.s({ value: target.value })}
            errorMessage={formOrder.e.value?.message}
            type="number"
            step="0.01"
          />
        </InputRoot>

        <InputRoot>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            value={formOrder.v.date}
            onChange={({ target }) => formOrder.s({ date: target.value })}
            errorMessage={formOrder.e.date?.message}
            type="date"
          />
        </InputRoot>

        <SelectRoot>
          <Label htmlFor="typeId">Type</Label>
          <Select
            value={formOrder.v.typeId}
            onChange={(value) => formOrder.s({ typeId: value, tagIds: [] })}
            options={listFinanceTypes}
            errorMessage={formOrder.e.typeId?.message}
          />
        </SelectRoot>
      </div>

      <InputRoot className="mb-6">
        <Label htmlFor="tags" className="min-h-[16px]">
          Tags{" "}
          <span className="font-thin text-xs">
            {formatTagsIds(formOrder.v.tagIds)}
          </span>
        </Label>

        <div className="grid grid-cols-3 gap-2 p-2 bg-black/5 rounded border">
          {filterTagByTypeId(formOrder.v.typeId).map((tag) => (
            <Label
              htmlFor={`tags-[${tag.id}]`}
              key={tag.id}
              className="flex items-center justify-start gap-2 border p-2 cursor-pointer bg-white rounded"
            >
              <Input
                className="h-min w-min border-0"
                id={`tags-[${tag.id}]`}
                checked={!!formOrder.v.tagIds.includes(tag.id)}
                onChange={({ target }) => {
                  const tagIds = target.checked
                    ? [...formOrder.v.tagIds, tag.id]
                    : [...formOrder.v.tagIds.filter((v) => v !== tag.id)];

                  formOrder.s({ tagIds });
                }}
                type="checkbox"
              />
              <span>{tag.name}</span>
            </Label>
          ))}
        </div>

        {formOrder.e.tagIds?.message && (
          <span className="lowercase text-red-600 font-bold italic text-sm -mt-2 mx-1">
            {formOrder.e.tagIds?.message}
          </span>
        )}

        {!formOrder.v.typeId && (
          <span className="lowercase text-neutral-800 italic text-sm -mt-2 mx-1">
            Selecione o Type para visualizar as tags
          </span>
        )}
      </InputRoot>

      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => formOrder.onClose()}
        >
          Cancel
        </Button>
        <Button type="submit" variant="default">
          {formOrder.v.id ? "Save" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default FormOrder;
