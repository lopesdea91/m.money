import { routesForLogin } from "./login"
import { routesForOrders } from "./order"

const endpoints = {
  orders: routesForOrders,
  login: routesForLogin,
}

export { endpoints }
