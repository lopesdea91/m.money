import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../../database/AppDataSource';
import { User } from '../../entity/User';

const userRepository = AppDataSource.getRepository(User);

export default async function AppMiddlewareProvider(req: Request, res: Response, next: NextFunction) {
  if ([
    '/users',
    '/auth/signIn',
    '/seeders',
  ].includes(req.url)) {
    return next()
  }

  try {
    const [, token] = req.headers.authorization?.split(' ') || [];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userLogged = await userRepository.findOneBy({ token })

    if (!userLogged) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  } catch (error) {
    return res.status(400).json({ message: 'Bad Request' });
  }
};