import { Outlet } from "react-router";

import useMiddleware from "@/hooks/useMiddleware";
import ToastGeneric from "../Toasts.generic";

export const LayoutPublic = () => {
  const { isPending } = useMiddleware();

  return isPending ? null : (
    <>
      <ToastGeneric />
      <div className="h-screen w-screen flex *:m-auto">
        <Outlet />
      </div>
    </>
  );
};
