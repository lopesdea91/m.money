import { getQueryString } from "@/@features/http/handlerQueryString"
import httpClient from "@/@features/http/httpClient"
import type { FinanceOrder } from "@/types"

const url = '/finance-orders'

export const getFinanceOrderApi = async (query: {
  userId: number
  typeId?: number
  situationId?: number
}) => {
  return httpClient.get<FinanceOrder[]>(`${url}${getQueryString(query)}`)
    .then(({ data }) => data)
}

export const getIdFinanceOrderApi = async (id: number) => {
  return httpClient.get<FinanceOrder>(`${url}/${id}`)
    .then(({ data }) => data)
}

export const createFinanceOrderApi = async (payload: {
  value: number
  date: string
  typeId: number
  tagIds: number[]
  active: number
  userId: number
}) => {
  const body: Omit<FinanceOrder, 'id' | 'type' | 'tags'> = {
    value: payload.value,
    date: payload.date,
    typeId: payload.typeId,
    tagIds: payload.tagIds,
    active: payload.active,
    userId: payload.userId,
  }

  return httpClient.post<FinanceOrder>(url, body)
    .then(({ data }) => data)
}

export const updateFinanceOrderApi = async (
  id: number,
  payload: {
    value: number
    date: string
    typeId: number
    tagIds: number[]
    active: number
    userId: number
  }
) => {
  const data = {
    value: payload.value,
    date: payload.date,
    typeId: payload.typeId,
    tagIds: payload.tagIds,
    active: payload.active,
    userId: payload.userId,
  }

  return httpClient.put<FinanceOrder>(`${url}/${id}`, data)
    .then(({ data }) => data)
}

export const deleteFinanceOrderApi = async (
  id: number
) => {
  return httpClient.delete(`${url}/${id}`)
    .then(({ status }) => status)
}