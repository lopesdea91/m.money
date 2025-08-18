import { AppDataSource } from "../../database/AppDataSource";
import { FinanceOrderTags } from "../../entity/FinanceOrderTags";

const financeOrderTagsRepository = AppDataSource.getRepository(FinanceOrderTags);

export default financeOrderTagsRepository