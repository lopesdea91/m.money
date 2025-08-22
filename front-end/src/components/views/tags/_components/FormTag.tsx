import { triggerValue } from "@/@features/services/triggers";
import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectRoot } from "@/components/ui/select";
import { useTrigger } from "@/hooks/useTriggers";
import type { IFormFinanceTagInput } from "@/types";
import { useTagPageContext } from "../page.context";
import { onSubmit } from "./FormTag.actions";
import { useTagForm } from "./FormTag.hooks";

const FormTag = () => {
  const { listFinanceTypes } = useTagPageContext();

  const { values, errors, setValues, defineValues, handleSubmit } =
    useTagForm(onSubmit);

  useTrigger<IFormFinanceTagInput>("modalFormTagData", (payload) => {
    defineValues(payload);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <InputRoot>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={({ target }) => setValues({ name: target.value })}
            errorMessage={errors.name?.message}
          />
        </InputRoot>

        <SelectRoot>
          <Label htmlFor="typeId">Type</Label>
          <Select
            disabled={!!values.id}
            value={values.typeId}
            onChange={(value) => setValues({ typeId: value })}
            options={listFinanceTypes}
          />
        </SelectRoot>
      </div>

      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          onClick={() => triggerValue({ modalFormTag: false })}
          variant="outline"
        >
          Cancel
        </Button>
        <Button type="submit">{values.id ? "Save" : "Create"}</Button>
      </div>
    </form>
  );
};

export default FormTag;
