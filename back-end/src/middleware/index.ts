import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

const userRepository = AppDataSource.getRepository(User);

export default async function middleware(req: Request, res: Response, next: NextFunction) {
  if ([
    '/auth/signIn',
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