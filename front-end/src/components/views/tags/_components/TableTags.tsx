import { PenIcon } from "lucide-react";

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
import { cn } from "@/utils/utils";
import { useTagPageContext } from "../page.context";

const TableTags = () => {
  const { listLimit, table, triggerCount, triggerValue } = useTagPageContext();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">ID</TableHead>
          <TableHead className="">Name</TableHead>
          <TableHead className="px-4">Type</TableHead>
          <TableHead className="px-4">Active</TableHead>
          <TableHead className="text-right text-xs">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {table.v.items?.map?.((tag) => (
          <TableRow key={tag.id}>
            <TableCell className="text-xs">{tag.id}</TableCell>

            <TableCell className="text-xs">{tag.name}</TableCell>

            <TableCell className="text-xs">
              <span
                className={cn(
                  "px-4 py-1.5 rounded-md font-bold inline-block",
                  { "bg-blue-50 text-blue-800": tag.typeId === 1 },
                  { "bg-red-50 text-red-800": tag.typeId === 2 }
                )}
              >
                {tag.type.name}
              </span>
            </TableCell>

            <TableCell className="text-xs">
              <span
                className={cn(
                  "px-4 py-1.5 rounded-md font-medium inline-block",
                  { "border-x-[1px]": tag.active === 1 },
                  { "bg-gray-50 text-gray-500": tag.active === 0 }
                )}
              >
                {tag.active ? "Active" : "Inactive"}
              </span>
            </TableCell>

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
                      modalFormTag: true,
                      modalFormTagData: tag,
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
                triggerCount("tableTag");
              }}
              onPrevPage={(page) => {
                table.stored().set({ page });
                triggerCount("tableTag");
              }}
              onNextPage={(page) => {
                table.stored().set({ page });
                triggerCount("tableTag");
              }}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableTags;
