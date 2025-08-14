
import type { AppSchema, Server } from "@/__mock-api/types";
import { Response } from "miragejs";

export function routesForLogin(server: Server) {
  server.post(`/login`, (schema: AppSchema, request) => {

    /** get attributes by body */
    const { email } = JSON.parse(request.requestBody) as { email: string }

    /** find login register by email */
    const findLogin = schema.logins.findBy({ email })

    if (!findLogin)
      return new Response(401, {}, { message: 'E-mail ou senha incorretos!' })

    /** gererate fake token */
    const tokenFake = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)

    const data = {
      user: {
        name: findLogin.name,
        email: findLogin.email,
      },
      token: tokenFake
    }

    /** set fake token in login register */
    findLogin.update({ token: tokenFake })

    return new Response(201, {}, data)
  })
  server.get(`/user-data`, (schema: AppSchema, request) => {
    /** get attributes by headers */
    const { 1: token } = request.requestHeaders.Authorization.split(' ')

    /** find login register by email */
    const findLogin = schema.logins.findBy({ token })

    if (!findLogin)
      return new Response(401, {}, { message: 'token inválido!' })

    const data = {
      user: {
        name: findLogin.name,
        email: findLogin.email,
      },
      token
    }

    return new Response(200, {}, data)
  })
}