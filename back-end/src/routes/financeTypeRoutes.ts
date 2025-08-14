import { Router } from 'express';

import { getFinanceTypes } from '../controllers/FinanceTypeControllers';

const financeTypeRoutes = Router()

financeTypeRoutes.get('/finance-types', getFinanceTypes);

export default financeTypeRoutes