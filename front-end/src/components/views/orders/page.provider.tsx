import features from "@/@features";
import { storeStructure } from "@/@store";
import { type ReactNode } from "react";
import { OrderPageContext } from "./page.context";
import { useOrderPageHook } from "./page.hook";

export const OrderPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pageHook = useOrderPageHook(storeStructure.getState(), features);
  return (
    <OrderPageContext.Provider value={pageHook}>
      {children}
    </OrderPageContext.Provider>
  );
};
