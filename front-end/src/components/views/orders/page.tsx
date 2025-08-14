import { PlusIcon } from "lucide-react";

import { triggerValue } from "@/@features/services/triggers";
import PageTitle from "@/components/PageTitle";
import ModalFormOrder from "./_components/ModalFormOrder";
import TableOrders from "./_components/TableOrders";

export const OrdersView = () => {
  return (
    <>
      <PageTitle label="Orders" className="justify-between">
        <button
          className="cursor-pointer border rounded size-[24px] flex *:m-auto"
          onClick={() =>
            triggerValue({ modalFormOrder: true, modalFormTagData: {} })
          }
        >
          <PlusIcon size={18} />
        </button>
      </PageTitle>

      <TableOrders />

      <ModalFormOrder />
    </>
  );
};
