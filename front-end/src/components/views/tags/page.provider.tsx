import { type ReactNode } from "react";
import { TagPageContext } from "./page.context";
import { useTagPageHook } from "./page.hook";

export const TagPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pageHook = useTagPageHook();
  return (
    <TagPageContext.Provider value={pageHook}>
      {children}
    </TagPageContext.Provider>
  );
};
