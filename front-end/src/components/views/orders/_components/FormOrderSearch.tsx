import { PlusIcon } from "lucide-react";

import { Select } from "@/components/ui/select";
import { useOrderPageContext } from "../page.context";

const FormOrderSearch = () => {
  const { listActive, listFinanceTypes, formSearch, triggerValue } =
    useOrderPageContext();

  return (
    <div className="flex items-center gap-2 w-max">
      <Select
        placeholder="Type"
        value={formSearch.v.typeId}
        onChange={(v) => formSearch.s({ typeId: v })}
        options={listFinanceTypes}
        optionEmpty
      />

      <Select
        placeholder="Active"
        value={formSearch.v.active}
        onChange={(v) => formSearch.s({ active: v })}
        options={listActive}
        optionEmpty
      />

      <button
        className="cursor-pointer border rounded size-[24px] flex *:m-auto min-w-[24px]"
        onClick={() =>
          triggerValue({ modalFormOrder: true, modalFormOrderData: {} })
        }
      >
        <PlusIcon size={18} />
      </button>
    </div>
  );
};

export default FormOrderSearch;
