import { getQueryString } from "@/@features/http/handlerQueryString"
import httpClient from "@/@features/http/httpClient"
import type { FinanceTag } from "@/types"

const url = '/finance-tags'

export const getFinanceTagApi = async (
  query: {
    userId: number
    typeId?: number
  }
) => {
  return httpClient
    .get<FinanceTag[]>(`${url}${getQueryString(query)}`)
    .then(({ data }) => data)
}

export const createFinanceTagApi = async (
  payload: {
    name: string
    typeId: number
    userId: number
  }
) => {
  return httpClient
    .post<FinanceTag>(url, payload)
    .then(({ data }) => data)
}

export const updateFinanceTagApi = async (
  id: number,
  payload: {
    name: string
    typeId: number
    userId: number
  }
) => {
  return httpClient
    .put<FinanceTag>(`${url}/${id}`, payload)
    .then(({ data }) => data)
}
