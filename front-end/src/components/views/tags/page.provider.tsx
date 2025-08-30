import features from "@/@features";
import { storeStructure } from "@/@store";
import { type ReactNode } from "react";
import { TagPageContext } from "./page.context";
import { useTagPageHook } from "./page.hook";

export const TagPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pageHook = useTagPageHook(storeStructure.getState(), features);

  return (
    <TagPageContext.Provider value={pageHook}>
      {children}
    </TagPageContext.Provider>
  );
};
