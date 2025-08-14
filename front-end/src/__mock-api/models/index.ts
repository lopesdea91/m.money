import type { Order } from "@/domain/order"
import type { OrderCategory } from "@/domain/order-category"
import type { OrderStatus } from "@/domain/order-status"
import type { OrderType } from "@/domain/order-type"
import { Model } from "miragejs"
import type { ModelDefinition } from "miragejs/-types"

export const OrderModel: ModelDefinition<Order & { _month: string }> = Model.extend({})
export const OrderCategoryModel: ModelDefinition<OrderCategory> = Model.extend({})
export const OrderTypeModel: ModelDefinition<OrderType> = Model.extend({})
export const OrderStatusModel: ModelDefinition<OrderStatus> = Model.extend({})
export const StatusModel: ModelDefinition<OrderStatus> = Model.extend({})
export const LoginModel: ModelDefinition<{ email: string }> = Model.extend({})

export const models = {
  orderCategory: OrderCategoryModel,
  orderType: OrderTypeModel,
  orderStatus: OrderStatusModel,
  order: OrderModel,
  login: LoginModel,
}