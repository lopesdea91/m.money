import financeTypeService from '../../app/Services/FinanceTypeService';
import { FinanceType } from '../../entity/FinanceType';

export default async function FinanceTypeSeeding() {
  const roleSeeds: FinanceType[] = [
    { id: 1, name: 'Receita' },
    { id: 2, name: 'Despesa' },
  ]

  console.log('-- sedding finance TYPE - START');

  await Promise.all(roleSeeds.map(data => financeTypeService.create(data)))

  console.log('-- sedding finance TYPE - END');
}