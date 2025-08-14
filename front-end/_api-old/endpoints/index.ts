import { routesForLogin } from "./login"
import { routesForPosts } from "./post"

const endpoints = {
  posts: routesForPosts,
  login: routesForLogin,
}

export { endpoints }
