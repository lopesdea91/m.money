import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const repository = AppDataSource.getRepository(User);

const roleSeeds: User[] = [
  { id: 1, name: 'user 1', email: 'user1@email.com', isActive: true, token: '' },
  { id: 2, name: 'user 2', email: 'user2@email.com', isActive: true, token: '' },
]

export default async function UserSeeding() {
  await Promise
    .all(roleSeeds.map((role) => {
      return repository.save(role)
    }))

  console.log('-- sedding user');
}