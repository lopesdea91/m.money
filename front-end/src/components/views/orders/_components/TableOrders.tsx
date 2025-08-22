import { PenIcon, TrashIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatTagsIds, formatValue } from "@/utils/financeOrder";
import { cn } from "@/utils/utils";
import { useOrderPageContext } from "../page.context";

const TableOrders = () => {
  const { listLimit, table, triggerCount, triggerValue } =
    useOrderPageContext();

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
        {table.v.items.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="text-xs">{order.id}</TableCell>

            <TableCell className="text-xs">
              {formatValue(order.value)}
            </TableCell>

            <TableCell className="text-xs">{formatDate(order.date)}</TableCell>

            <TableCell className="text-xs">
              <span
                className={cn(
                  "px-4 py-1.5 rounded-md font-bold inline-block",
                  { "bg-blue-50 text-blue-800": order.typeId === 1 },
                  { "bg-red-50 text-red-800": order.typeId === 2 }
                )}
              >
                {order.type.name}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              {formatTagsIds(order.tagIds)}
            </TableCell>

            <TableCell className="">
              <div className="flex items-center justify-end gap-1">
                <button
                  className="cursor-pointer border size-[24px] flex *:m-auto"
                  onClick={() => {
                    triggerValue({
                      modalConfirmDelete: true,
                      modalConfirmDeleteData: { id: order.id },
                    });
                  }}
                >
                  <TrashIcon size={16} />
                </button>

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

        {table.v.items.length === 0 && (
          <TableRow>
            <TableCell colSpan={6}>
              <div className="min-h-[50px]">No records</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={6}>
            <TablePagination
              perPage={table.v.perPage}
              currentPage={table.v.currentPage}
              total={table.v.total}
              lastPages={table.v.lastPages}
              listLimit={listLimit}
              onLimit={(v) => {
                table.stored().set({ limit: +v });
                triggerCount("tableOrder");
              }}
              onPrevPage={(page) => {
                table.stored().set({ page });
                triggerCount("tableOrder");
              }}
              onNextPage={(page) => {
                table.stored().set({ page });
                triggerCount("tableOrder");
              }}
            />

            {/* <div className="flex items-center gap-2">
              <Select
                placeholder="Limit"
                value={table.v.perPage.toString()}
                onChange={(v) => {
                  pageOrderSearchStored().set({ limit: +v });
                  // setData((p) => ({ ...p, perPage: +v }));
                  triggerCount("tableOrder");
                }}
                options={listLimit}
                className="w-fit"
              />
              <button
                className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={table.v.currentPage === 1}
                onClick={() => {
                  pageOrderSearchStored().set({ page: table.v.currentPage - 1 });
                  triggerCount("tableOrder");
                }}
              >
                <ChevronLeftIcon size={18} />
              </button>
              <button
                className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={table.v.currentPage === table.v.lastPages}
                onClick={() => {
                  pageOrderSearchStored().set({ page: table.v.currentPage + 1 });
                  triggerCount("tableOrder");
                }}
              >
                <ChevronRightIcon size={18} />
              </button>
            </div> */}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableOrders;
