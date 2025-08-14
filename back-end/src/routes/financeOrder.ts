import { Router } from 'express'
import { createFinanceOrder, deleteFinanceOrder, getFinanceOrderById, getFinanceOrders, updateFinanceOrder } from '../controllers/FinanceOrderControllers'

const financeOrderRoutes = Router()

financeOrderRoutes.get('/finance-orders', getFinanceOrders)
financeOrderRoutes.get('/finance-orders/:id', getFinanceOrderById)
financeOrderRoutes.post('/finance-orders', createFinanceOrder)
financeOrderRoutes.put('/finance-orders/:id', updateFinanceOrder)
financeOrderRoutes.delete('/finance-orders', deleteFinanceOrder)

export default financeOrderRoutes