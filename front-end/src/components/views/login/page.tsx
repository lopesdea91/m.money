import { cn } from "@/utils/utils";
import { useNavigate } from "react-router";
import { create } from "zustand";
import Form from "./_components/LoginForm";

export const LoginPage = () => {
  return (
    <div className={cn("w-full max-w-sm", "rounded border p-4")}>
      <h1 className="text-3xl font-semibold leading-12 border-b mb-2">Login</h1>
      <Form />
    </div>
  );
};

type Store = {
  count: number;
  setData: (params: { count: number }) => void;
  increment: () => void;
};
const useStoreExemplo = create<Store>((set) => ({
  count: 0,
  setData: (params) => set((state) => ({ ...state, ...params })),
  increment: () => set((state) => ({ ...state, count: state.count + 1 })),
}));

const features = {
  reset: () => {
    useStoreExemplo.setState({ count: 0 });
  },
  increment: () => {
    useStoreExemplo.getState().increment();
  },
  log: () => {
    const { count } = useStoreExemplo.getState();

    console.log({ count });
  },
};
type Features = typeof features;

const BtnNavigate = ({ navigate }: { navigate: (path: string) => void }) => {
  const btns = [
    { label: "Page1", action: () => navigate("/") },
    { label: "Page2", action: () => navigate("/teste2") },
  ];
  return (
    <div className="flex gap-2">
      {btns.map(({ label, action }) => (
        <button key={label} className="p-2 border bg-gray-200" onClick={action}>
          {label}
        </button>
      ))}
    </div>
  );
};
const BtnActions = ({
  count,
  increment,
  reset,
  log,
}: {
  count: number;
  increment?: () => void;
  reset?: () => void;
  log?: () => void;
}) => {
  const btns = [
    { hidden: !increment, label: "increment", action: increment },
    { hidden: !reset, label: "reset", action: reset },
    { hidden: !log, label: "log", action: log },
  ];

  return (
    <>
      <h1>Count: {count}</h1>

      <div className="flex gap-2">
        {btns.map(({ label, action }) => (
          <button
            key={label}
            className={"p-2 border bg-gray-200" + (action ? "" : " hidden")}
            onClick={action}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
};

const useHookStructure = (store: Store, features: Features) => {
  const navigate = useNavigate();

  return {
    count: store.count,
    increment: features.increment,
    reset: features.reset,
    log: features.log,
    navigate,
  };
};
const useHookBase = () => useHookStructure(useStoreExemplo(), features);

const useHookPage1 = () => {
  const { count, increment, reset, log, navigate } = useHookBase();

  const localIncrement = () => {
    console.log("... useHookPage1 localIncrement");
    increment();
  };
  const localReset = () => {
    console.log("... useHookPage1 localReset");
    reset();
  };
  return { count, increment: localIncrement, reset: localReset, log, navigate };
};

export const Page = () => {
  const { count, increment, reset, log, navigate } = useHookPage1();
  return (
    <div className="w-full max-w-sm rounded border p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Page 1</h1>
      <BtnNavigate {...{ navigate }} />
      <BtnActions {...{ count, increment, reset, log }} />
    </div>
  );
};

const useHookPage2 = () => useHookBase();

export const Page2 = () => {
  const { count, increment, reset, navigate } = useHookPage2();
  return (
    <div className="w-full max-w-sm rounded border p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Page 2</h1>
      <BtnNavigate {...{ navigate }} />
      <BtnActions {...{ count, increment, reset }} />
    </div>
  );
};
