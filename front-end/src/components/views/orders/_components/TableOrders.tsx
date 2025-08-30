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
  const { tableOrder, filterOrder, listLimit } = useOrderPageContext();

  return (
    <Table>
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
        {tableOrder.v.items.map((order) => (
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
                  className={cn(
                    "flex *:m-auto size-[36px] rounded-md cursor-pointer hover:shadow-md duration-150",
                    "border border-red-800/20 hover:border-red-800/80 bg-red-50",
                    "text-red-700"
                  )}
                  onClick={() => tableOrder.onDelete(order.id)}
                >
                  <TrashIcon size={16} className="" />
                </button>

                <button
                  className={cn(
                    "flex *:m-auto size-[36px] rounded-md cursor-pointer hover:shadow-md duration-150",
                    "border border-gray-300 hover:border-gray-600",
                    "text-gray-600"
                  )}
                  onClick={() => tableOrder.onEdit(order)}
                >
                  <PenIcon size={16} />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}

        {tableOrder.v.items.length === 0 && (
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
              perPage={filterOrder.v.limit}
              currentPage={filterOrder.v.page}
              total={tableOrder.v.total}
              lastPage={tableOrder.v.lastPage}
              listLimit={listLimit}
              onLimit={(limit) => tableOrder.onLimit(limit)}
              onPrevPage={(page) => tableOrder.onChangePage(page)}
              onNextPage={(page) => tableOrder.onChangePage(page)}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableOrders;
