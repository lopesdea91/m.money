import { IncomingHttpHeaders } from 'http';
import userService from '../app/Services/UserService';

const authUser = async (headers: IncomingHttpHeaders) => {
  const [, token] = headers?.authorization?.split(' ') || [];

  const { item } = (await userService.getToken(token))

  return item
}

export default authUser