import { Router } from 'express';

import financeTypeControllers from '../app/Controllers/FinanceTypeControllers';

const financeTypeRoutes = Router()

financeTypeRoutes.get('/finance-types', financeTypeControllers.get);

export default financeTypeRoutes