import { cn } from "@/utils/utils";
import { FilterIcon, PlusIcon } from "lucide-react";
import { useOrderPageContext } from "../page.context";

function ButtonActionsOrder() {
  const { triggerValue } = useOrderPageContext();

  return (
    <div className="flex gap-2">
      <button
        className={cn(
          "flex *:m-auto size-[36px] rounded-md cursor-pointer hover:shadow-md duration-150",
          "border border-gray-300 hover:border-gray-600",
          "text-gray-600"
        )}
        onClick={() =>
          triggerValue({ modalFormOrder: true, modalFormOrderData: {} })
        }
      >
        <PlusIcon size={18} />
      </button>

      <button
        className={cn(
          "flex *:m-auto size-[36px] rounded-md cursor-pointer hover:shadow-md duration-150",
          "border border-gray-300 hover:border-gray-600",
          "text-gray-600"
        )}
        onClick={() => triggerValue({ modalFilterOrder: true })}
      >
        <FilterIcon size={18} />
      </button>
    </div>
  );
}

export default ButtonActionsOrder;
