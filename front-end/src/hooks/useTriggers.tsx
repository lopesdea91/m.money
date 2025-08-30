import type { TriggerValueKeys } from "@/types";
import sleep from "@/utils/sleep";
import { useEffect } from "react";
import { useStore } from "./useStore";

type Callback<T> = (params: T) => void;

function useTrigger<T>(
  key: TriggerValueKeys,
  callback: Callback<T>,
  { delay }: { delay: number } = { delay: 50 }
) {
  const { triggers } = useStore();

  useEffect(() => {
    async function handler() {
      const v = triggers?.[key] as T;

      // if (!v) return;

      if (delay) await sleep(delay);

      callback(v);
    }
    handler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggers?.[key]]);
}

export { useTrigger };
