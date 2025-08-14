import { AppDataSource } from "../data-source";
import { FinanceOrder } from "../entity/FinanceOrder";
import { repositoryBase } from "./_repositoryBase";

const financeOrderRepository = repositoryBase(AppDataSource.getRepository(FinanceOrder));

export default financeOrderRepository