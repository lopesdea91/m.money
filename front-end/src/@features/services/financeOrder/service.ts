import { createFinanceOrderApi, deleteFinanceOrderApi, getFinanceOrderApi, getIdFinanceOrderApi, updateFinanceOrderApi } from "@/@features/api/financeOrderApi"
import { getStore } from "@/@store"

export const getFinanceOrderService = async (search: {
  typeId?: number
  status?: number
} = {}) => {
  const userId = getStore().auth.id

  const financeOrderAll = await getFinanceOrderApi({ ...search, userId })

  return financeOrderAll
}

export const getIdFinanceOrderService = async (id: number) => {
  const financeOrderById = await getIdFinanceOrderApi(id)

  return financeOrderById
}

export const createFinanceOrderService = async (payload: {
  value: number
  date: string
  typeId: number
  tagIds: number[]
}) => {
  const data = { ...payload }

  const financeOrderCreated = await createFinanceOrderApi(data)

  return financeOrderCreated
}

export const updateFinanceOrderService = async (
  { id, ...payload }: {
    id: number
    value: number
    date: string
    typeId: number
    tagIds: number[]
    // active: number
    // createdAt: string
    // userId: number
  }
) => {
  const data = { ...payload }

  const financeOrderUpdated = await updateFinanceOrderApi(id, data)

  return financeOrderUpdated
}

export const deleteFinanceOrderService = async (id: number) => {
  const financeOrderDeleted = await deleteFinanceOrderApi(id)

  return financeOrderDeleted
}