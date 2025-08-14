import { createFinanceTagApi, getFinanceTagApi, updateFinanceTagApi } from "@/@features/api/financeTagApi"
import { getStore } from "@/@store"


export const getFinanceTagService = async (search: {
  typeId?: number
} = {}) => {
  const userId = getStore().auth.id

  const financeTagAll = await getFinanceTagApi({ ...search, userId })

  return financeTagAll
}

export const createFinanceTagService = async (payload: {
  name: string
  typeId: number
}) => {
  const userId = getStore().auth.id

  const data = {
    name: payload.name,
    typeId: payload.typeId,
    userId: userId,
  }

  const financeTagCreated = await createFinanceTagApi(data)

  return financeTagCreated
}

export const updateFinanceTagService = async ({ id, ...payload }: {
  id: number
  name: string
  typeId: number
}) => {
  const userId = getStore().auth.id

  const data = {
    name: payload.name,
    typeId: payload.typeId,
    userId: userId,
  }

  const financeTagUpdated = await updateFinanceTagApi(id, data)

  return financeTagUpdated
}