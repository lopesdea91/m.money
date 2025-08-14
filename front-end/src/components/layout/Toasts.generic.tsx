import { XIcon } from "lucide-react";

import useToast from "@/hooks/useToast";
import { cn } from "@/utils/utils";

export default function ToastGeneric() {
  const toast = useToast();
  return (
    <div className="fixed top-2 right-2 flex flex-col gap-4 items-end">
      {toast.items.map((item) => (
        <div
          key={item._id}
          className={cn(
            "w-[200px] flex items-start gap-2 p-2",
            "border-[1px] rounded shadow-2xl",
            "bg-white"
          )}
        >
          <span className="flex-1 text-sm font-bold">{item.message}</span>

          <button
            className={cn("p-0.5 cursor-pointer", "border-[1px] rounded")}
            onClick={() => toast.remove(item._id)}
          >
            <XIcon size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
