import { Route as RouterRR, Routes as RoutesRR } from "react-router";

import { LayoutPrivate } from "./components/layout/private/LayoutPrivate";
import { LayoutPublic } from "./components/layout/public/LayoutPublic";
import { DashboardPage } from "./components/views/dashboard/page";
import { LoginPage } from "./components/views/login/page";
import { OrdersView } from "./components/views/orders/page";
import { TagsView } from "./components/views/tags/page";

const Routes = () => {
  return (
    <RoutesRR>
      <RouterRR element={<LayoutPublic />}>
        <RouterRR path="/" element={<LoginPage />} />
      </RouterRR>

      <RouterRR element={<LayoutPrivate />}>
        <RouterRR path="/dashboard" element={<DashboardPage />} />

        <RouterRR path="/order" element={<OrdersView />} />
        <RouterRR path="/tag" element={<TagsView />} />
      </RouterRR>
    </RoutesRR>
  );
};

export default Routes;
