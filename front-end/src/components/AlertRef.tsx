import { XIcon } from "lucide-react";

import { removeToast } from "@/@features/services/toast/service";
import { getStore } from "@/@store";

export default function AlertRef({ ref }: { ref: string }) {
  const toastsRef = getStore().toast.filter((el) => el._key === ref);

  return (
    <div className="flex flex-col gap-2 items-stretch">
      {toastsRef.map((toast) => (
        <div key={toast._id} className="flex items-center bg-gray-100 p-1">
          <span className="block flex-1 truncate text-sm px-1">
            {toast.message}
          </span>

          <button
            className="p-0.5 border rounded"
            onClick={() => removeToast(toast._id)}
          >
            <XIcon size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
