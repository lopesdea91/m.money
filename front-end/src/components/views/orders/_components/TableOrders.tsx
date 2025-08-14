import { PenIcon } from "lucide-react";
import { useState } from "react";

import { getFinanceOrderService } from "@/@features/services/financeOrder/service";
import { triggerValue } from "@/@features/services/triggers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePageInit } from "@/hooks/usePageInit";
import { useTrigger } from "@/hooks/useTriggers";
import type { FinanceOrder } from "@/types";

const TableOrders = () => {
  const [orders, setOrders] = useState<FinanceOrder[]>([]);

  const fetchData = async () => {
    setOrders(await getFinanceOrderService());
  };

  usePageInit({ title: "Orders", cb: fetchData });
  useTrigger("tableOrder", () => fetchData());

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">ID</TableHead>
          <TableHead className="">Value</TableHead>
          <TableHead className="">Date</TableHead>
          <TableHead className="">Type</TableHead>
          <TableHead className="">Tags</TableHead>
          <TableHead className="text-right text-xs">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="text-xs">{order.id}</TableCell>

            <TableCell className="text-xs">{order.value}</TableCell>

            <TableCell className="text-xs">{order.date}</TableCell>

            <TableCell className="text-xs">{order.type.name}</TableCell>

            <TableCell className="text-xs">tags</TableCell>

            <TableCell className="">
              <div className="flex items-center justify-end gap-1">
                {/* 
                  <button className="cursor-pointer border size-[24px] flex *:m-auto">
                    <TrashIcon size={16} />
                  </button> 
                */}

                <button
                  className="cursor-pointer border rounded size-[24px] flex *:m-auto"
                  onClick={() => {
                    triggerValue({
                      modalFormOrder: true,
                      modalFormOrderData: order,
                    });
                  }}
                >
                  <PenIcon size={16} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default TableOrders;
