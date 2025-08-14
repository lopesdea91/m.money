import type { Server } from "@/__mock-api/types";
import type { OrderStatus } from "@/domain/order-status";

export function orderStatusSeeds(server: Server) {
  const dataList: OrderStatus[] = [
    { id: 1, name: 'Ok', slug: 'ok' },
    { id: 2, name: 'Pendente', slug: 'pending' },
  ]

  dataList.forEach(({ id, name, slug }) => {
    server.create('orderStatus', {
      id,
      name,
      slug
    })
  })
}