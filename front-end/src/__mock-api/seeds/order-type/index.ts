import type { Server } from "@/__mock-api/types";
import type { OrderType } from "@/domain/order-type";

export function orderTypeSeeds(server: Server) {
  const dataList: OrderType[] = [
    { id: 1, name: 'Receita' },
    { id: 2, name: 'Despesa' },
  ]

  dataList.forEach(({ id, name }) => {
    server.create('orderType', {
      id,
      name,
    })
  })
}