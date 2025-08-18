import { Router } from 'express';
import financeTagController from '../app/Controllers/FinanceTagControllers';

const financeTagRoutes = Router();

financeTagRoutes.get('/finance-tags', financeTagController.get);
financeTagRoutes.get('/finance-tags/:id', financeTagController.getId);
financeTagRoutes.post('/finance-tags', financeTagController.create);
financeTagRoutes.put('/finance-tags/:id', financeTagController.update);
financeTagRoutes.delete('/finance-tags/:id', financeTagController.delete);

export default financeTagRoutes;