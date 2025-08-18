import { Request, Response } from "express";
import FinanceOrderSeeding from "../../database/seeders/FinanceOrderSeeder";
import FinanceTagSeeding from "../../database/seeders/FinanceTagSeeder";
import FinanceTypeSeeding from "../../database/seeders/FinanceTypeSeeder";
import UserSeeding from "../../database/seeders/UserSeeder";

const systemControllers = {
  seeders: async (req: Request, res: Response) => {
    try {
      await UserSeeding()
      await FinanceTypeSeeding()
      await FinanceTagSeeding()
      await FinanceOrderSeeding()

      res.status(200).json({ message: 'OK' });;
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
export default systemControllers
