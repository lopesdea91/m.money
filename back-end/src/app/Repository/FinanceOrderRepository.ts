import { AppDataSource } from "../../database/AppDataSource";
import { FinanceOrder } from "../../entity/FinanceOrder";

const financeOrderRepository = AppDataSource.getRepository(FinanceOrder);

export default financeOrderRepository