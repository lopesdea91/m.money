import { Router } from 'express';
import { createFinanceTag, deleteFinanceTag, getFinanceTagById, getFinanceTags, updateFinanceTag } from '../controllers/FinanceTagControllers';

const financeTagRoutes = Router();

financeTagRoutes.get('/finance-tags', getFinanceTags);
financeTagRoutes.get('/finance-tags/:id', getFinanceTagById);
financeTagRoutes.post('/finance-tags', createFinanceTag);
financeTagRoutes.put('/finance-tags/:id', updateFinanceTag);
financeTagRoutes.delete('/finance-tags/:id', deleteFinanceTag);

export default financeTagRoutes;