import { formatValue } from "@/utils/financeOrder";
import { cn } from "@/utils/utils";
import { useDashboardPageHook } from "../page.hook";

function SumTypes() {
  const {
    data: { sumTypes },
  } = useDashboardPageHook();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
      {sumTypes.map((sumType) => (
        <div
          key={sumType.label}
          className={cn(
            "grid gap-2 p-4",
            "border border-gray-300 rounded shadow-sm"
          )}
        >
          <span className="font-thin text-lg">{sumType.label}</span>
          <span className="font-semibold font-mono text-2xl text-gray-700 truncate ">
            {formatValue(sumType.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SumTypes;
