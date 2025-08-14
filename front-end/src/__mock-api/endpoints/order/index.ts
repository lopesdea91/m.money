
import { filterQueryString } from "@/@features/http/handlerQueryString";
import type { AppSchema, Server } from "@/__mock-api/types";
import { Response } from "miragejs";


export function routesForOrders(server: Server) {
  server.get(`/orders`, (schema: AppSchema, request) => {

    const params = filterQueryString(request.queryParams)

    if (params?.date) {
      params['_month'] = params?.date
      delete params?.date
    }
    if (!params?.userId) {
      return new Response(500, {}, ['userId é um campo obrigatório'])
    }


    console.log({ params });

    let items = []


    items = schema.orders.where(params).models.map(item => {
      /** status */
      const statusCollection = schema.orderStatuses.findBy({ 'id': item.statusId })
      const statusId = item.statusId
      const status = {
        id: statusCollection.id,
        name: statusCollection.name,
        slug: statusCollection.slug,
      }
      /** type */
      const typeCollection = schema.orderTypes.findBy({ 'id': item.typeId })
      const typeId = item.typeId
      const type = {
        id: typeCollection.id,
        name: typeCollection.name,
      }
      /** category */
      const categoryCollection = schema.orderCategories.findBy({ 'id': item.categoryId })
      const categoryId = item.categoryId
      const category = {
        id: categoryCollection.id,
        name: categoryCollection.name,
      }
      return {
        id: item.id,
        value: item.value,
        date: item.date,
        status,
        statusId,
        type,
        typeId,
        category,
        categoryId,
        createdAt: item.createdAt,
        // userId: item.userId,
      }
    })

    return new Response(200, {}, items)
  })
}