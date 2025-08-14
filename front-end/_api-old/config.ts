// import * as faker from "faker"
import { createServer } from "miragejs"
import { endpoints } from "./endpoints"
import { factories } from "./factories"
import { models } from "./models"
import { seeds } from "./seeds"

export function startMirage() {
  const server = createServer({
    models,
    factories,
    seeds,
  })
  server.timing = 500

  server.logging = true

  // external URLs
  // server.post(
  //   `${process.env.RAYGUN_URL}/:any`,
  //   () => new Promise((_res: any) => { }),
  // )

  // internal URLs
  // server.urlPrefix = process.env.API_URL ?? ""
  for (const namespace of Object.keys(endpoints)) {
    //@ts-ignore
    endpoints[namespace](server)
  }

  server.namespace = ""
  server.passthrough()

  // console.log({ server })
  // console.log({ dump: server.db.dump() })



  return server
}