import type { Server } from "@/__mock-api/types";
import type { OrderCategory } from "@/domain/order-category";

export function orderCategorySeeds(server: Server) {
  const dataList: OrderCategory[] = [
    // receitas
    {
      "id": 1,
      "name": "Pagamento",
      "status": 1,
      "ordertypeId": 1,
      "userId": 1
    },
    {
      "id": 5,
      "name": "Dividendos",
      "status": 1,
      "ordertypeId": 1,
      "userId": 1
    },
    // despesas
    {
      "id": 2,
      "name": "Mercado ...",
      "status": 1,
      "ordertypeId": 2,
      "userId": 1
    },
    {
      "id": 3,
      "name": "Cinema ..",
      "status": 1,
      "ordertypeId": 2,
      "userId": 1
    },
    {
      "id": 4,
      "name": "Combustivel",
      "status": 1,
      "ordertypeId": 2,
      "userId": 1
    },
    {
      "id": 6,
      "name": "Energia ..",
      "status": 1,
      "ordertypeId": 2,
      "userId": 1
    },
    {
      "id": 7,
      "name": "Água ....",
      "status": 1,
      "ordertypeId": 2,
      "userId": 1
    }
  ]

  dataList.forEach(({ id, name, status, ordertypeId, userId }) => {
    server.create('orderCategory', {
      id,
      name,
      status,
      ordertypeId,
      userId
    })
  })
}