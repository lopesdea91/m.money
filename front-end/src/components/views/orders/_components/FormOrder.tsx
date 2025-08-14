import { triggerValue } from "@/@features/services/triggers";
import { Button } from "@/components/ui/button";
import { Input, InputRoot } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTrigger } from "@/hooks/useTriggers";
import type { IFormFinanceOrderValues } from "@/types";
import { onSubmit } from "./FormTag.actions";
import { useOrderForm } from "./FormTag.hooks";

const FormOrder = () => {
  const { values, errors, setValues, defineValues, handleSubmit } =
    useOrderForm(onSubmit);

  useTrigger<IFormFinanceOrderValues>("modalFormOrderData", (v) =>
    defineValues(v)
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-6">
          <InputRoot>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={values.value}
              onChange={({ target }) => setValues({ value: target.value })}
              errorMessage={errors.value?.message}
            />
          </InputRoot>

          <SelectRoot>
            <Label htmlFor="typeId">Type</Label>
            <Select
              disabled={!!values.id}
              value={values.typeId}
              onValueChange={(value) => {
                if (!value) return;
                setValues({ typeId: value });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Receita</SelectItem>
                <SelectItem value="2">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </SelectRoot>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            onClick={() => triggerValue({ modalFormOrder: false })}
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
