import { getFinanceTypeApi } from "../../api/financeTypeApi"

export const getFinanceTypeService = async () => {
  const financeTypeAll = await getFinanceTypeApi()

  return financeTypeAll
} 