import { type ReactNode } from "react";
import { OrderPageContext } from "./page.context";
import { useOrderPageHook } from "./page.hook";

export const OrderPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pageHook = useOrderPageHook();
  return (
    <OrderPageContext.Provider value={pageHook}>
      {children}
    </OrderPageContext.Provider>
  );
};
