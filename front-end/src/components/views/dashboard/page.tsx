import PageTitle from "@/components/PageTitle";
import ChartLineOrders from "./_components/ChartLineOrders";
import ChartPieExpenses from "./_components/ChartPieExpenses";
import ChartPieRevenues from "./_components/ChartPieRevenues";
import ListOrders from "./_components/ListOrders";
import SumTypesCards from "./_components/SumTypesCards";
import { DashboardPageContextProvider } from "./page.provider";

export const DashboardPage = () => {
  return (
    <DashboardPageContextProvider>
      <PageTitle label="Dashboard" className="mb-4" />

      <SumTypesCards />

      <div className="grid grid-cols-1 md:grid-cols-3 md:h-[500px] md:h-[250px] gap-2 mb-6">
        <ChartPieRevenues />
        <ChartPieExpenses />
        <ListOrders />
      </div>

      <ChartLineOrders />
    </DashboardPageContextProvider>
  );
};
