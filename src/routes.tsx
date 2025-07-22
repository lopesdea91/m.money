import { Route as RouterRR, Routes as RoutesRR } from "react-router";
import { LayoutPrivate } from "./components/layout/private/LayoutPrivate";
import { LayoutPublic } from "./components/layout/public/LayoutPublic";
import { CategoryIdPage } from "./components/pages/category.id/page";
import { CategoryListPage } from "./components/pages/category.list/page";
import { DashboardPage } from "./components/pages/dashboard/page";
import { LoginPage } from "./components/pages/login/page";
import { OrderListPage } from "./components/pages/order.list/page";
import { OrderIdPage } from "./components/pages/order/page";

const Routes = () => {
  return (
    <RoutesRR>
      <RouterRR element={<LayoutPublic />}>
        <RouterRR path="/" element={<LoginPage />} />
      </RouterRR>

      <RouterRR element={<LayoutPrivate />}>
        <RouterRR path="/dashboard" element={<DashboardPage />} />

        <RouterRR path="/order" element={<OrderListPage />} />
        <RouterRR path="/order/:orderId" element={<OrderIdPage />} />

        <RouterRR path="/category" element={<CategoryIdPage />} />
        <RouterRR path="/category/:categoryId" element={<CategoryListPage />} />
      </RouterRR>
    </RoutesRR>
  );
};

export default Routes;
