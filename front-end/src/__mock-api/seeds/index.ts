import type { Server } from "@/__mock-api/types"
import { loginSeeds } from "./login"
import { orderSeeds } from "./order"
import { orderCategorySeeds } from "./order-category"
import { orderStatusSeeds } from "./order-status"
import { orderTypeSeeds } from "./order-type"

export const seeds = (server: Server) => {
  orderCategorySeeds(server)
  orderStatusSeeds(server)
  orderTypeSeeds(server)
  orderSeeds(server)
  loginSeeds(server)
}