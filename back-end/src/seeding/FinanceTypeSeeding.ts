import { AppDataSource } from '../data-source';
import { FinanceType } from '../entity/FinanceType';

const repository = AppDataSource.getRepository(FinanceType);

const roleSeeds: FinanceType[] = [
  { id: 1, name: 'Receita' },
  { id: 2, name: 'Despesa' },
  { id: 3, name: 'X' },
]

export default async function FinanceTypeSeeding() {
  await Promise
    .all(roleSeeds.map((role) => {
      repository.save(role)
    }))

  console.log('-- sedding finance types');
}