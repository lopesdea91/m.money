import { ChartContent } from "@/components/ui/chart";
import { useNavigate } from "react-router";
import { useDashboardPageContext } from "../page.context";

function ChartLineOrders() {
  const navigate = useNavigate();
  const {
    triggerValue,
    tableOrder,
    data: { sumTags },
  } = useDashboardPageContext();

  return (
    <ChartContent
      options={{
        series: [
          {
            type: "line",
            data: [1, 2, 3, 4],
          },
        ],
      }}
    />
  );
}

export default ChartLineOrders;
