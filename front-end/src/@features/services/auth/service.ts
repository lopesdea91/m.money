import { authSignInApi, authSignOutApi, authUserApi } from "@/@features/api/authApi"
import { authCookie } from "@/@features/memory/cookie"
import { setStore } from "@/@store"

export const authSignInService = async (
  payload: {
    email: string
    password: string
  }
) => {
  const body = { ...payload }

  const { data } = await authSignInApi(body)

  authCookie.set({ token: data.token })

  setStore({
    l: { isLogged: true },
    auth: { ...data.user },
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
  const { data } = await authUserApi()

  setStore({
    l: { isLogged: true },
    auth: { ...data },
  })

}