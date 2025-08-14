import httpClient from "@/@features/http/httpClient"

export const authSignInApi = async (
  payload: {
    email: string
    password: string
  }
) => {
  const body = { ...payload }

  return await httpClient.post<{ token: string; user: { id: number; email: string, name: string } }>(`/auth/signIn`, body)
}

export const authSignOutApi = async () => {
  return await httpClient.get<{ message: string }>(`/loguot`)
}

export const authUserApi = async () => {
  return await httpClient.get<{ id: number; email: string; name: string }>(`/auth/data`)
}