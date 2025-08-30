import { ChartContent } from "@/components/ui/chart";
import { useDashboardPageContext } from "../page.context";

function ChartPieExpenses() {
  const {
    data: { chartExpenses },
  } = useDashboardPageContext();

  return (
    <ChartContent
      options={{
        series: [
          {
            type: "pie",
            data: [...chartExpenses],
          },
        ],
      }}
    />
  );
}

export default ChartPieExpenses;
