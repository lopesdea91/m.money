import financeOrderService from '../../app/Services/FinanceOrderService';
import { FinanceOrder } from '../../entity/FinanceOrder';

export default async function FinanceOrderSeeding() {
  const roleSeeds: (FinanceOrder & { tagIds: number[] })[] = [
    // { id: 1, value: '1000', date: '2025-08-02', month: '2025-08', typeId: 1, userId: 1, active: 1 },
    // { id: 1, value: '500', date: '2025-08-10', month: '2025-08', typeId: 1, userId: 1, active: 1 },
    // { id: 1, value: '2000', date: '2025-08-25', month: '2025-08', typeId: 1, userId: 1, active: 1 },
    // { id: 1, value: '30', date: '2025-08-08', month: '2025-08', typeId: 2, userId: 1, active: 1 },
    // { id: 1, value: '50', date: '2025-08-07', month: '2025-08', typeId: 2, userId: 1, active: 1 },
    // { id: 1, value: '1200', date: '2025-08-11', month: '2025-08', typeId: 2, userId: 1, active: 1 },
    // { id: 1, value: '1200', date: '2025-08-18', month: '2025-08', typeId: 2, userId: 1, active: 1 },
  ]

  console.log('-- sedding finance ORDER - START');

  await Promise.all(roleSeeds.map(data => financeOrderService.create(data)))

  console.log('-- sedding finance ORDER - END');
}