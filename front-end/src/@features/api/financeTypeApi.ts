import httpClient from "@/@features/http/httpClient"
import type { FinanceType } from "@/types"

const url = '/finance-types'

export const getFinanceTypeApi = async () => {
  return httpClient.get<FinanceType[]>(url).then(({ data }) => data)
} 