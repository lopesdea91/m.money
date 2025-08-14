import { IncomingHttpHeaders } from 'http';
import userRepository from '../repository/userRepository';


export const authByHeaders = async (headers: IncomingHttpHeaders) => {
  const [, token] = headers?.authorization?.split(' ') || [];

  const users = (await userRepository.findAll())

  const userByToken = users.find((user) => user.token === token)

  return userByToken
}
