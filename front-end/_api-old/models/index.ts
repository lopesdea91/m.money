import type { ILogin, IPost } from "@/types"
import { Model } from "miragejs"
import type { ModelDefinition } from "miragejs/-types"

export const PostModel: ModelDefinition<IPost> = Model.extend({})
export const LoginModel: ModelDefinition<ILogin> = Model.extend({})

export const models = {
  post: PostModel,
  login: LoginModel
}