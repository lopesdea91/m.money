import { Server as ServerMirage } from "miragejs";
import type Schema from "miragejs/orm/schema";

import type { Registry } from "miragejs/-types";
import type { LoginModel, OrderCategoryModel, OrderModel, OrderStatusModel, OrderTypeModel } from "./models";

type AppRegistry = Registry<
  {
    order: typeof OrderModel;
    orderCategory: typeof OrderCategoryModel;
    orderType: typeof OrderTypeModel;
    orderStatus: typeof OrderStatusModel;
    login: typeof LoginModel;
  },
  {}
>;

export type Server = ServerMirage<AppRegistry>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppSchema = Schema<AppRegistry> & any

export type LoginData = {
  email: string
  name: string
  token: string
}