import { AppDataSource } from '../data-source';
import { FinanceTag } from '../entity/FinanceTag';

const repository = AppDataSource.getRepository(FinanceTag);

const roleSeeds: FinanceTag[] = [
  { id: 1, name: 'Pagamento', typeId: 1, userId: 1 },
  { id: 2, name: 'Mercado', typeId: 2, userId: 1 },
  { id: 3, name: 'Energia', typeId: 2, userId: 1 },
  { id: 4, name: 'Agua', typeId: 2, userId: 1 },
]

export default async function FinanceTagSeeding() {
  await Promise
    .all(roleSeeds.map(async (role) => {
      const data = repository.create(role)
      await repository.save(data)
    }))

  console.log('-- sedding finance tag');
}