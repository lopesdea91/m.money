import "reflect-metadata";
import { DataSource } from "typeorm";

import { FinanceOrder } from "../entity/FinanceOrder";
import { FinanceOrderTags } from "../entity/FinanceOrderTags";
import { FinanceTag } from "../entity/FinanceTag";
import { FinanceType } from "../entity/FinanceType";
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER || "myuser",
  password: process.env.POSTGRES_PASSWORD || "mypassword",
  database: process.env.POSTGRES_DB || "mydb",
  synchronize: true, // Use em desenvolvimento. Em produção, use migrations!
  logging: false,
  entities: [User, FinanceType, FinanceTag, FinanceOrder, FinanceOrderTags],
  migrations: [],
  subscribers: [],
});