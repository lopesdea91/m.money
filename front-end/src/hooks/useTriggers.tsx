import { useEffect } from "react";
import { useStore } from "./useStore";

type Callback<T> = (params?: T) => void;

function useTrigger<T>(key: string, callback: Callback<T>) {
  const { triggers } = useStore();

  useEffect(() => {
    const v = triggers?.[key] as T;

    if (!v) return;

    callback(v);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggers?.[key]]);
}

export { useTrigger };
