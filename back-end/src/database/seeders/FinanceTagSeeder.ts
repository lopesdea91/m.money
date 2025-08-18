import financeTagService from '../../app/Services/FinanceTagService';
import { FinanceTag } from '../../entity/FinanceTag';

export default async function FinanceTagSeeding() {
  const roleSeeds: FinanceTag[] = [
    { id: 1, name: 'Pagamento', typeId: 1, userId: 1, active: 1 },
    { id: 2, name: 'Mercado', typeId: 2, userId: 1, active: 1 },
    { id: 3, name: 'Energia', typeId: 2, userId: 1, active: 1 },
    { id: 4, name: 'Agua', typeId: 2, userId: 1, active: 1 },
  ]

  console.log('-- sedding finance TAG - START');

  await Promise.all(roleSeeds.map(data => financeTagService.create(data)))

  console.log('-- sedding finance TAG - END');
}