import { formatValue } from "@/utils/financeOrder";
import { cn } from "@/utils/utils";
import { useNavigate } from "react-router";
import { useDashboardPageHook } from "../page.hook";

function ChartTags() {
  const navigate = useNavigate();
  const {
    triggerValue,
    tableOrder,
    data: { sumTags },
  } = useDashboardPageHook();

  return (
    <>
      <div
        className={cn(
          "md:col-span-2 max-h-[380px] overflow-hidden"
          // "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6"
        )}
      >
        {sumTags.map((sumType) => (
          <div
            key={sumType.key}
            className={cn()
            // "grid gap-1 p-4"
            // "border border-gray-300 rounded shadow-sm"
            }
          >
            <span className="font-thin text-lg">{sumType.key}</span>
            <span className="font-semibold font-mono text-2xl text-gray-700 truncate ">
              {formatValue(sumType.value)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChartTags;
