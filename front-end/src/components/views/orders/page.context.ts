import { createContext, useContext } from "react";
import type { useOrderPageHook } from "./page.hook";

type IContext = ReturnType<typeof useOrderPageHook>;

export const OrderPageContext = createContext<IContext>({} as IContext);

export const useOrderPageContext = () => useContext(OrderPageContext);