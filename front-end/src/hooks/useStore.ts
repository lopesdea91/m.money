import { storeStructure } from '@/@store'

export const useStore = () => {
  const store = storeStructure()

  return { ...store }
}
