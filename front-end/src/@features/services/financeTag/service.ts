import { createFinanceTagApi, getFinanceTagApi, getPaginationFinanceTagApi, updateFinanceTagApi } from "@/@features/api/financeTagApi"
import { getStore } from "@/@store"
import type { FinanceTag } from "@/types"

export const getPaginationFinanceTagService = async (search: {
  limit: number
  page: number
  typeId?: number
  active?: number
}) => {
  const userId = getStore().auth.id

  const paginationFinanceTag = await getPaginationFinanceTagApi({ ...search, userId })

  return paginationFinanceTag
}

export const getFinanceTagService = async (search: {
  typeId?: number
  active?: number
  limit?: number
  page?: number
} = {}) => {
  const userId = getStore().auth.id

  const {
    items = [],
    currentPage = 1,
    lastPages = 1,
    perPage = 10,
    total = 0
  } = await getFinanceTagApi({ ...search, userId })

  return { items, currentPage, lastPages, perPage, total }
}

export const createFinanceTagService = async (payload: {
  name: string
  typeId: number
}) => {
  const userId = getStore().auth.id

  const data: Omit<FinanceTag, 'id' | 'type'> = {
    name: payload.name,
    typeId: payload.typeId,
    active: 1,
    userId: userId,
  }

  const financeTagCreated = await createFinanceTagApi(data)

  return financeTagCreated
}

export const updateFinanceTagService = async ({ id, ...payload }: {
  id: number
  name: string
  typeId: number
  active: number
}) => {
  const userId = getStore().auth.id

  const data: Omit<FinanceTag, 'id' | 'type'> = {
    name: payload.name,
    typeId: payload.typeId,
    active: payload.active,
    userId: userId,
  }

  const financeTagUpdated = await updateFinanceTagApi(id, data)

  return financeTagUpdated
}