import { loginFactory } from "./login"
import { postFactory } from "./post"

const factories = {
  post: postFactory,
  login: loginFactory,
}

export { factories }
