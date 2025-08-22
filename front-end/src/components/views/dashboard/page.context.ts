import { createContext, useContext } from "react";
import type { useDashboardPageHook } from "./page.hook";

type IContext = ReturnType<typeof useDashboardPageHook>;

export const DashboardPageContext = createContext<IContext>({} as IContext);

export const useDashboardPageContext = () => useContext(DashboardPageContext);