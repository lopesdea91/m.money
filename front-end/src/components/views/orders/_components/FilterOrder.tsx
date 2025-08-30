import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { filterTagByTypeId, formatTagsIds } from "@/utils/financeOrder";
import { useOrderPageContext } from "../page.context";

const FilterOrder = () => {
  const { listActive, listFinanceTypes, filterOrder } = useOrderPageContext();

  return (
    <>
      <div className="grid gap-4 mb-6">
        <Select
          placeholder="Type"
          value={filterOrder.v.typeId.toString()}
          onChange={(v) => filterOrder.s({ typeId: +v, tagIds: [] })}
          options={listFinanceTypes}
          optionEmpty
        />

        <Select
          placeholder="Active"
          value={filterOrder.v.active.toString()}
          onChange={(v) => filterOrder.s({ active: +v })}
          options={listActive}
          optionEmpty
        />

        <InputRoot className="mb-6">
          <Label htmlFor="tags" className="min-h-[16px]">
            Tags{" "}
            <span className="font-thin text-xs">
              {formatTagsIds(filterOrder.v.tagIds)}
            </span>
          </Label>

          <div className="grid grid-cols-3 gap-2 p-2 bg-black/5 rounded border">
            {filterTagByTypeId(filterOrder.v.typeId?.toString()).map((tag) => (
              <Label
                htmlFor={`tags-[${tag.id}]`}
                key={tag.id}
                className="flex items-center justify-start gap-2 border p-2 cursor-pointer bg-white rounded"
              >
                <Input
                  className="h-min w-min border-0"
                  id={`tags-[${tag.id}]`}
                  checked={!!filterOrder.v.tagIds.includes(tag.id)}
                  onChange={({ target }) => {
                    if (target.checked) {
                      filterOrder.s({
                        tagIds: [...filterOrder.v.tagIds, tag.id],
                      });

                      return;
                    }

                    const tagIds = [
                      ...filterOrder.v.tagIds.filter(
                        (tabId) => tabId !== tag.id
                      ),
                    ];
                    filterOrder.s({ tagIds });
                  }}
                  type="checkbox"
                />
                <span>{tag.name}</span>
              </Label>
            ))}
          </div>
        </InputRoot>
      </div>

      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => filterOrder.onClose()}
        >
          Close
        </Button>

        <Button
          type="button"
          variant="default"
          onClick={() => filterOrder.onSearch()}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default FilterOrder;
