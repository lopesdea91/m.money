import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectRoot } from "@/components/ui/select";
import { useTagPageContext } from "../page.context";

const FormTag = () => {
  const { formTag, listFinanceTypes, listActive } = useTagPageContext();

  return (
    <form onSubmit={formTag.onSubmit}>
      <div className="grid md:grid-cols-2 items-start gap-4 mb-6">
        <InputRoot>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formTag.v.name}
            onChange={({ target }) => formTag.s({ name: target.value })}
            errorMessage={formTag.e.name?.message}
          />
        </InputRoot>

        <SelectRoot>
          <Label htmlFor="typeId">Type</Label>
          <Select
            disabled={!!formTag.v.id}
            value={formTag.v.typeId}
            onChange={(value) => formTag.s({ typeId: value })}
            options={listFinanceTypes}
            errorMessage={formTag.e.typeId?.message}
          />
        </SelectRoot>

        <SelectRoot>
          <Label htmlFor="active">Active</Label>
          <Select
            value={formTag.v.active}
            onChange={(value) => formTag.s({ active: value })}
            options={listActive}
            errorMessage={formTag.e.active?.message}
          />
        </SelectRoot>
      </div>

      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => formTag.onClose()}
        >
          Cancel
        </Button>
        <Button type="submit" variant="default">
          {formTag.v.id ? "Save" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default FormTag;
