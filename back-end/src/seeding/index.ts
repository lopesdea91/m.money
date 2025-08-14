import FinanceTagSeeding from "./FinanceTagSeeding";
import FinanceTypeSeeding from "./FinanceTypeSeeding";
import UserSeeding from "./UserSeeding";

export default async function RunSeedings() {
  await UserSeeding()
  await FinanceTypeSeeding()
  await FinanceTagSeeding()
}