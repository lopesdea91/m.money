import { setStore } from "@/@store";

export const navigateTo = (to: string) => {
  setStore({ triggers: { 'navigateTo': to } })
}
