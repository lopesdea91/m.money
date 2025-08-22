import { PlusIcon } from "lucide-react";

import { Select } from "@/components/ui/select";
import { useTagPageContext } from "../page.context";

const FormTagSearch = () => {
  const { listActive, listFinanceTypes, formSearch, triggerValue } =
    useTagPageContext();

  return (
    <div className="flex items-center gap-2 w-max">
      <Select
        placeholder="Type"
        value={formSearch.v.typeId?.toString?.()}
        onChange={(v) => formSearch.s({ typeId: v })}
        options={listFinanceTypes}
        optionEmpty
      />

      <Select
        placeholder="Active"
        value={formSearch.v.active?.toString?.()}
        onChange={(v) => formSearch.s({ active: v })}
        options={listActive}
        optionEmpty
      />

      <button
        className="cursor-pointer border rounded size-[24px] flex *:m-auto min-w-[24px]"
        onClick={() =>
          triggerValue({ modalFormTag: true, modalFormTagData: {} })
        }
      >
        <PlusIcon size={18} />
      </button>
    </div>
  );
};

export default FormTagSearch;
