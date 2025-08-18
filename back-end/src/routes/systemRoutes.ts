import { Router } from 'express';
import systemControllers from '../app/Controllers/SystemControllers';

const systemRoutes = Router();

systemRoutes.get('/seeders', systemControllers.seeders);

export default systemRoutes;