import type { Server } from "@/__mock-api/types";
import type { Order } from "@/domain/order";

export function orderSeeds(server: Server) {
  const dataList: Order[] = [
    { id: 1, value: 50, date: '2025-06-05', statusId: 1, typeId: 1, categoryId: 1, createdAt: '2025-06-05', userId: 1 },
    { id: 1, value: 50, date: '2025-06-06', statusId: 1, typeId: 2, categoryId: 2, createdAt: '2025-06-05', userId: 1 },
    { id: 1, value: 50, date: '2025-06-10', statusId: 2, typeId: 2, categoryId: 3, createdAt: '2025-06-05', userId: 1 },
    { id: 1, value: 50, date: '2025-06-12', statusId: 2, typeId: 2, categoryId: 4, createdAt: '2025-06-05', userId: 1 },
    { id: 1, value: 50, date: '2025-07-05', statusId: 2, typeId: 1, categoryId: 1, createdAt: '2025-06-05', userId: 1 },
    { id: 1, value: 50, date: '2025-08-05', statusId: 2, typeId: 1, categoryId: 1, createdAt: '2025-06-05', userId: 1 },
  ]

  dataList.forEach(({ id, value, date, typeId, statusId, categoryId, createdAt, userId }) => {
    server.create('order', {
      // id,
      _month: date.slice(0, 7),
      value,
      date,
      typeId,
      statusId,
      categoryId,
      createdAt,
      userId
    })
  })
}