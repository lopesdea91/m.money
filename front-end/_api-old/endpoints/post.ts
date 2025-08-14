import type { IPost } from "@/types";
import { Response } from "miragejs";
import type { AppSchema, Server } from "../types";

export function routesForPosts(server: Server) {
  server.get(`/posts`, (schema: AppSchema) => {
    const posts = schema.posts.all().models

    return new Response(200, {}, posts)
  })

  server.get(`/posts/:id`, ({ posts }: AppSchema, request) => {
    const id = request.params.id

    const findPost = posts.find(id)

    if (!findPost)
      return new Response(204, {}, { errors: ['ID não localizado!'] })

    return new Response(200, {}, findPost)
  })

  server.post(`/posts`, (schema: AppSchema, request) => {
    const { title, description } = JSON.parse(request.requestBody) as { title: string, description: string }

    const newPost: IPost = {
      id: (new Date()).getTime(),
      title,
      description
    }

    const postCreated = schema.posts.create(newPost)

    const post = postCreated.attrs

    return new Response(201, {}, post)
  })

  server.put(`/posts/:id`, ({ posts }: AppSchema, request) => {
    const id = request.params.id
    const { title, description } = JSON.parse(request.requestBody) as { title: string, description: string }

    const findPost = posts.find(id)

    if (!findPost)
      return new Response(204, {}, { errors: ['ID não localizado!'] })

    const postUpdated = findPost.update({ title, description })

    return new Response(201, {}, postUpdated)
  })

  server.delete(`/posts/:id`, ({ posts }: AppSchema, request) => {
    const id = request.params.id

    const findPost = posts.find(id)

    if (!findPost)
      return new Response(204, {}, { errors: ['ID não localizado!'] })

    findPost.destroy()

    return new Response(200, {}, {})
  })
}