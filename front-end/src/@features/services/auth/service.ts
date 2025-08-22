import { authSignInApi, authSignOutApi, authUserApi } from "@/@features/api/authApi"
import { getFinanceTagApi } from "@/@features/api/financeTagApi"
import { getFinanceTypeApi } from "@/@features/api/financeTypeApi"
import { authCookie } from "@/@features/memory/cookie"
import { appStored } from "@/@features/memory/stored"
import { setStore } from "@/@store"

export const authSignInService = async (
  payload: {
    email: string
    password: string
  }
) => {
  const body = { ...payload }

  const { data: { token } } = await authSignInApi(body)

  authCookie.set({ token: token })

  const { data: auth } = await authUserApi()

  const userId = auth.id

  const listFinanceTypes = await getFinanceTypeApi()
  const listFinanceTags = await getFinanceTagApi({ userId })

  const { month } = appStored().get()

  setStore({
    l: { isLogged: true },
    auth: { ...auth },
    month,
    listFinanceTags,
    listFinanceTypes
  })
}

export const authSignOutService = async () => {
  await authSignOutApi()

  authCookie.destroy()

  setStore({
    l: { isLogged: false },
    auth: { id: 0, email: '', name: '' },
    listFinanceTags: [],
    listFinanceTypes: []
  })
}

export const getAuthUserService = async () => {
  const { data: auth } = await authUserApi()

  const userId = auth.id

  const listFinanceTypes = await getFinanceTypeApi()
  const listFinanceTags = await getFinanceTagApi({ userId })

  const { month } = appStored().get()

  setStore({
    l: { isLogged: true },
    auth: { ...auth },
    month,
    listFinanceTags,
    listFinanceTypes
  })
}