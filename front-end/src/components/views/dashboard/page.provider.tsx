import { type ReactNode } from "react";
import { DashboardPageContext } from "./page.context";
import { useDashboardPageHook } from "./page.hook";

export const DashboardPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pageHook = useDashboardPageHook();
  return (
    <DashboardPageContext.Provider value={pageHook}>
      {children}
    </DashboardPageContext.Provider>
  );
};
