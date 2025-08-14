import type { LoginData, Server } from "@/__mock-api/types";

export function loginSeeds(server: Server) {
  const dataList: LoginData[] = [
    {
      "email": 'teste1@email.com',
      "name": "User teste 1",
      "token": ""
    },
    {
      "email": 'teste2@email.com',
      "name": "User teste 2",
      "token": ""
    },
  ]

  dataList.forEach(({ email, name, token }) => {
    server.create('login', {
      name,
      email,
      token
    })
  })
}