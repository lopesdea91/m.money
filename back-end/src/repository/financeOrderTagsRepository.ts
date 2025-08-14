import { AppDataSource } from "../data-source";
import { FinanceOrderTags } from "../entity/FinanceOrderTags";
import { repositoryBase } from "./_repositoryBase";

const financeOrderTagsRepository = repositoryBase(AppDataSource.getRepository(FinanceOrderTags));

export default financeOrderTagsRepository