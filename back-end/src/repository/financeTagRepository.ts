import { AppDataSource } from "../data-source";
import { FinanceTag } from "../entity/FinanceTag";
import { repositoryBase } from "./_repositoryBase";

const financeTagRepository = repositoryBase(AppDataSource.getRepository(FinanceTag));

export default financeTagRepository