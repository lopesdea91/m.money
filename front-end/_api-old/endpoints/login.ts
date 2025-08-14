
import { Response } from "miragejs";
import type { AppSchema, Server } from "../types";

export function routesForLogin(server: Server) {
  server.post(`/login`, (schema: AppSchema, request) => {
    const { email } = JSON.parse(request.requestBody) as { email: string }

    const [findLogin] = schema.logins.where({ email }).models as { email: string }[]

    if (!findLogin)
      return new Response(401, {}, { message: 'E-mail ou senha incorretos!' })

    const data = {
      token: Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
    }

    return new Response(201, {}, data)
  })
}