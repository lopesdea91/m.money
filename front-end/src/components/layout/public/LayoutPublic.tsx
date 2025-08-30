import { Outlet } from "react-router";

import useMiddleware from "@/hooks/useMiddleware";
import SetupGeneric from "../SetupGeneric";
import ToastGeneric from "../Toasts.generic";

export const LayoutPublic = () => {
  const { isPending } = useMiddleware();

  return isPending ? null : (
    <>
      <SetupGeneric />
      <ToastGeneric />

      <div className="h-screen w-screen flex *:m-auto">
        <Outlet />
      </div>
    </>
  );
};
