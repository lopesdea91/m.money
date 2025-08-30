import { createContext, useContext } from "react";
import type { useLoginPageHook } from "./page.hook";

type IContext = ReturnType<typeof useLoginPageHook>;

export const LoginPageContext = createContext<IContext>({} as IContext);

export const useLoginPageContext = () => useContext(LoginPageContext);