import type { Auth, StoreData } from "@/types";

export const initialState: StoreData = {
  l: {},
  auth: {} as Auth,
  toast: [],
  triggers: {},
  month: '',
  listFinanceTypes: [],
  listFinanceTags: [],
  listActive: [
    { id: 1, name: "Active" },
    { id: 0, name: 'Inactive' }
  ],
  listLimit: [
    { id: 5, name: "5" },
    { id: 10, name: "10" },
    { id: 20, name: "30" },
    { id: 40, name: "40" },
  ],
  pages: {
    tags: {
      filter: {
        typeId: 1,
        active: 1,
        limit: 10,
        page: 1
      },
      table: {
        items: [],
        lastPage: 1,
        total: 0
      }
    },
    orders: {
      filter: {
        active: 1,
        typeId: 1,
        tagIds: [],
        limit: 10,
        page: 1
      },
      table: {
        items: [],
        total: 0,
        lastPage: 1,
      }
    }
  }
}