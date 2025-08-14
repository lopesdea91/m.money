import type { ILogin } from "@/types"
// import * as faker from "faker"
import { Factory } from "miragejs"

export const loginFactory = Factory.extend<ILogin>({
  email() {
    return 'teste@email.com'
  },
  password() {
    return '12345'
  },
})