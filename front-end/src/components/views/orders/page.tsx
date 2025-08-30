import { Modal } from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import ButtonActionsOrder from "./_components/ButtonActionsOrder";
import FilterOrder from "./_components/FilterOrder";
import FormOrder from "./_components/FormOrder";
import ConfirmDelete from "./_components/ModalDeleteOrder";
import TableOrders from "./_components/TableOrders";
import { OrderPageContextProvider } from "./page.provider";

export const OrdersView = () => {
  return (
    <OrderPageContextProvider>
      <PageTitle label="Orders" className="justify-between">
        <ButtonActionsOrder />
      </PageTitle>

      <TableOrders />

      <Modal keyOpen="modalFormOrder" title="Order">
        <FormOrder />
      </Modal>

      <Modal keyOpen="modalFilterOrder" title="Filter order">
        <FilterOrder />
      </Modal>

      <Modal keyOpen="modalConfirmDelete" title="Delete order">
        <ConfirmDelete />
      </Modal>
    </OrderPageContextProvider>
  );
};
