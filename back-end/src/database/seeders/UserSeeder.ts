import userService from '../../app/Services/UserService';
import { User } from '../../entity/User';

export default async function UserSeeding() {
  const roleSeeds: User[] = [
    { id: 1, name: 'user 1', email: 'user1@email.com', active: 1, token: '' },
    { id: 2, name: 'user 2', email: 'user2@email.com', active: 1, token: '' },
  ]

  console.log('-- sedding finance TYPE - START');

  await Promise.all(roleSeeds.map(data => userService.create(data)))

  console.log('-- sedding finance TYPE - END');
}