import { AppDataSource } from "../../database/AppDataSource";
import { FinanceTag } from "../../entity/FinanceTag";

const financeTagRepository = AppDataSource.getRepository(FinanceTag);

export default financeTagRepository