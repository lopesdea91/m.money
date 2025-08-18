import { Router } from 'express'
import financeOrderController from '../app/Controllers/FinanceOrderControllers'

const financeOrderRoutes = Router()

financeOrderRoutes.get('/finance-orders', financeOrderController.get)
financeOrderRoutes.get('/finance-orders/:id', financeOrderController.getId)
financeOrderRoutes.post('/finance-orders', financeOrderController.create)
financeOrderRoutes.put('/finance-orders/:id', financeOrderController.update)
financeOrderRoutes.delete('/finance-orders/:id', financeOrderController.delete)

export default financeOrderRoutes