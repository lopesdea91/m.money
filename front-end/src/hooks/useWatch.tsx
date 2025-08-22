import sleep from "@/utils/sleep";
import { useEffect } from "react";

type Callback = () => void;

function useWatch(
  value: unknown,
  callback: Callback,
  { delay }: { delay: number } = { delay: 50 }
) {
  useEffect(() => {
    async function handler() {
      if (delay) await sleep(delay);

      callback();
    }
    handler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}

export { useWatch };
