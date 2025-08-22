import { Modal } from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import ConfirmDelete from "./_components/ConfirmDelete";
import FormOrder from "./_components/FormOrder";
import FormOrderSearch from "./_components/FormOrderSearch";
import TableOrders from "./_components/TableOrders";
import { OrderPageContextProvider } from "./page.provider";

export const OrdersView = () => {
  return (
    <OrderPageContextProvider>
      <PageTitle label="Orders" className="justify-between">
        <FormOrderSearch />
      </PageTitle>

      <TableOrders />

      <Modal keyOpen="modalFormOrder" title="Order">
        <FormOrder />
      </Modal>

      <Modal keyOpen="modalConfirmDelete" title="Delete Order">
        <ConfirmDelete />
      </Modal>
    </OrderPageContextProvider>
  );
};
