import type { Server } from "../types"
import { loginSeeds } from "./login"
import { postSeeds } from "./post"

export const seeds = (server: Server) => {
  postSeeds(server)
  loginSeeds(server)
}