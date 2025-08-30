import { formatValue } from "@/utils/financeOrder";
import { cn } from "@/utils/utils";
import { useDashboardPageContext } from "../page.context";

function SumTypesCards() {
  const {
    data: { sumTypesCards },
  } = useDashboardPageContext();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6">
      {sumTypesCards.map((sumTypesCard) => (
        <div
          key={sumTypesCard.label}
          className={cn(
            "grid gap-2 p-4",
            "border border-gray-300 rounded shadow-sm"
          )}
        >
          <span className="font-thin text-lg">{sumTypesCard.label}</span>
          <span className="font-semibold font-mono text-2xl text-gray-700 truncate ">
            {formatValue(sumTypesCard.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SumTypesCards;
