import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { repositoryBase } from "./_repositoryBase";

const userRepository = repositoryBase(AppDataSource.getRepository(User));

export default userRepository
