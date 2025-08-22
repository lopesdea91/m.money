import { createContext, useContext } from "react";
import type { useTagPageHook } from "./page.hook";

type IContext = ReturnType<typeof useTagPageHook>;

export const TagPageContext = createContext<IContext>({} as IContext);

export const useTagPageContext = () => useContext(TagPageContext);