import { AppDataSource } from "../../database/AppDataSource";
import { FinanceType } from "../../entity/FinanceType";

const financeTypeRepository = AppDataSource.getRepository(FinanceType);

export default financeTypeRepository;
