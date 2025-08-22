import { createFinanceOrderApi, deleteFinanceOrderApi, getFinanceOrderApi, getIdFinanceOrderApi, getPaginationFinanceOrderApi, updateFinanceOrderApi } from "@/@features/api/financeOrderApi"
import { getStore } from "@/@store"

export const getPaginationFinanceOrderService = async (search: {
  limit: number
  page: number
  month?: string
  typeId?: number
  tagIds?: number[]
  active?: number
}) => {
  const userId = getStore().auth.id

  const paginationFinanceOrder = await getPaginationFinanceOrderApi({ ...search, userId })

  return paginationFinanceOrder
}

export const getFinanceOrderService = async (search: {
  month?: string
  typeId?: number
  tagIds?: number[]
  active?: number
  limit?: number
  page?: number
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
  const userId = getStore().auth.id

  const data = {
    value: payload.value,
    date: payload.date,
    month: payload.date.slice(0, 7),
    typeId: payload.typeId,
    tagIds: payload.tagIds,
    active: 1,
    userId
  }

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
  }
) => {
  const userId = getStore().auth.id

  const data = {
    value: payload.value,
    date: payload.date,
    month: payload.date.slice(0, 7),
    typeId: payload.typeId,
    tagIds: payload.tagIds,
    active: 1,
    userId
  }

  const financeOrderUpdated = await updateFinanceOrderApi(id, data)

  return financeOrderUpdated
}

export const deleteFinanceOrderService = async (id: number) => {
  const financeOrderDeleted = await deleteFinanceOrderApi(id)

  return financeOrderDeleted
}