import { getQueryString } from "@/@features/http/handlerQueryString"
import httpClient from "@/@features/http/httpClient"
import type { FinanceTag } from "@/types"
import handlerPagination from "../http/handlerPagination"

const url = '/finance-tags'

export const getPaginationFinanceTagApi = async (
  query: {
    userId: number
    limit: number
    page: number
    active?: number
  }
) => {
  return httpClient.get<{
    items: FinanceTag[]
    "currentPage": number
    "lastPage": number
    "perPage": number
    "total": number
  }>(`${url}${getQueryString(query)}`)
    .then(({ data }) => handlerPagination(data))
}

export const getFinanceTagApi = async (
  query: {
    userId: number
    typeId?: number
    active?: number
  }
) => {
  return httpClient.get<FinanceTag[]>(`${url}${getQueryString(query)}`)
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
