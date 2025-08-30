import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectRoot } from "@/components/ui/select";
import { useTagPageContext } from "../page.context";

const FormTagSearch = () => {
  const { filterTag, listFinanceTypes, listActive } = useTagPageContext();

  return (
    <>
      <div className="grid gap-4 mb-6">
        <SelectRoot>
          <Label htmlFor="typeId">Type</Label>
          <Select
            name="typeId"
            placeholder="Type"
            value={filterTag.v.typeId?.toString?.()}
            onChange={(v) => filterTag.s({ typeId: v })}
            options={listFinanceTypes}
            optionEmpty
          />
        </SelectRoot>

        <SelectRoot>
          <Label htmlFor="active">Active</Label>
          <Select
            name="active"
            placeholder="Active"
            value={filterTag.v.active?.toString?.()}
            onChange={(v) => filterTag.s({ active: v })}
            options={listActive}
            optionEmpty
          />
        </SelectRoot>
      </div>

      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => filterTag.onClose()}
        >
          Close
        </Button>

        <Button
          type="button"
          variant="default"
          onClick={() => filterTag.onSearch()}
        >
          Search
        </Button>
      </div>
    </>
  );
};

export default FormTagSearch;
