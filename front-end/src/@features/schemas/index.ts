import * as formFinanceOrderSchemas from "./formFinanceOrder";
import * as formFinanceTagSchemas from "./formFinanceTag";
import * as formLoginSchemas from "./formLogin";

export const schemas = {
  ...formFinanceOrderSchemas,
  ...formFinanceTagSchemas,
  ...formLoginSchemas
}