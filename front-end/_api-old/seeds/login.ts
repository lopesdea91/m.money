import type { Server } from "../types"

export const loginSeeds = (server: Server) => {
  server.createList('login', 1)
}
