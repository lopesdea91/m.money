import { AppDataSource } from "../../database/AppDataSource";
import { User } from "../../entity/User";

const userRepository = AppDataSource.getRepository(User)

export default userRepository
