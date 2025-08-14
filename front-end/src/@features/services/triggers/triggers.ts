import { getStore, setStore } from "@/@store";
import type { TriggerCount, TriggerValue } from "@/types";

export const triggerValue = async (values: Partial<TriggerValue>) => {
  setStore({ triggers: values })
}

export const triggerCount = async (keys: TriggerCount | string[]) => {
  let { triggers } = getStore()

  Array.from(Array.isArray(keys) ? keys : [keys]).forEach(key => {
    const c = (triggers?.[key] ?? 0) as number

    triggers = {
      ...triggers,
      [key]: c + 1
    }
  })

  setStore({ triggers })
}

