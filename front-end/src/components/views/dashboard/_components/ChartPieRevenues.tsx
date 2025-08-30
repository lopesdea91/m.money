import { ChartContent } from "@/components/ui/chart";
import { useDashboardPageContext } from "../page.context";

function ChartPieRevenues() {
  const {
    data: { chartRevenues },
  } = useDashboardPageContext();

  return (
    <ChartContent
      options={{
        series: [
          {
            type: "pie",
            data: [...chartRevenues],
          },
        ],
      }}
    />
  );
}

export default ChartPieRevenues;
