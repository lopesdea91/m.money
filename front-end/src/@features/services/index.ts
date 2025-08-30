import * as authServices from "./auth";
import * as financeOrderServices from "./financeOrder/service";
import * as financeTagServices from "./financeTag/service";
import * as financeTypeServices from "./financeType/service";
import * as systemServices from "./system";
import * as toastServices from "./toast/service";
import * as triggersServices from "./triggers/service";

export const services = {
  ...authServices,
  ...financeOrderServices,
  ...financeTagServices,
  ...financeTypeServices,
  ...toastServices,
  ...triggersServices,
  ...systemServices,
}