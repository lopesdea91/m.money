import { AppDataSource } from "../data-source";
import { FinanceType } from "../entity/FinanceType";
import { repositoryBase } from "./_repositoryBase";

const financeTypeRepository = repositoryBase(AppDataSource.getRepository(FinanceType));

export default financeTypeRepository;
