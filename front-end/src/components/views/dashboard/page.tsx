import PageTitle from "@/components/PageTitle";
import ChartTags from "./_components/ChartTags";
import SumTags from "./_components/SumTags";
import SumTypes from "./_components/SumTypes";
import { DashboardPageContextProvider } from "./page.provider";

export const DashboardPage = () => {
  return (
    <DashboardPageContextProvider>
      <PageTitle label="Dashboard" className="mb-4" />

      <SumTypes />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <SumTags />
        <ChartTags />
      </div>
    </DashboardPageContextProvider>
  );
};
