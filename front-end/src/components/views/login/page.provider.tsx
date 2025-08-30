import features from "@/@features";
import { storeStructure } from "@/@store";
import { type ReactNode } from "react";
import { LoginPageContext } from "./page.context";
import { useLoginPageHook } from "./page.hook";

export const LoginPageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const pageHook = useLoginPageHook(storeStructure(), features);

  return (
    <LoginPageContext.Provider value={pageHook}>
      <div className="w-full max-w-sm rounded border p-4">{children}</div>
    </LoginPageContext.Provider>
  );
};
