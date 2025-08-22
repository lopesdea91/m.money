import { appStored } from "@/@features/memory/stored";
import { Input } from "@/components/ui/input";
import useMiddleware from "@/hooks/useMiddleware";
import { useStore } from "@/hooks/useStore";
import { cn } from "@/utils/utils";
import { Link, Outlet } from "react-router";
import ToastGeneric from "../Toasts.generic";

export const LayoutPrivate = () => {
  const { isPending } = useMiddleware();

  const { auth, month, setMonth } = useStore();

  return isPending ? null : (
    <>
      <ToastGeneric />

      <header className="bg-gray-800 text-white mb-4">
        <div
          className={cn(
            "max-w-4xl mx-auto",
            "flex items-center start gap-4 p-4"
          )}
        >
          <h1 className="text-xl font-bold">m.money</h1>

          <Input
            className="w-fit mr-auto border-y-transparent text-sm"
            value={month}
            onChange={({ target }) => {
              appStored().set({ month: target.value });
              setMonth(target.value);
              console.log(target.value);
            }}
            type="month"
          />

          <nav className="flex gap-2 md:gap-4 flex-col md:flex-row md:items-center md:justify">
            <ul className="flex items-center gap-2 md:gap-4">
              <Link
                to="/dashboard"
                className="text-sm text-gray-300 hover:text-gray-50 hover:underline"
              >
                Dashboard
              </Link>
              <Link
                to="/order"
                className="text-sm text-gray-300 hover:text-gray-50 hover:underline"
              >
                Orders
              </Link>
              <Link
                to="/tag"
                className="text-sm text-gray-300 hover:text-gray-50 hover:underline"
              >
                Tags
              </Link>
            </ul>

            <span
              className={cn(
                "bg-gray-500 opacity-75",
                "h-[1px] w-full",
                "md:h-4 md:w-[1px]"
              )}
            />

            <ul className="flex items-center justify-end">
              <Link
                to="/profile"
                className="text-sm text-gray-100 hover:text-gray-50 hover:underline"
              >
                Olá{" "}
                <span className="italic text-xs text-white">{auth.name}</span>
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};
