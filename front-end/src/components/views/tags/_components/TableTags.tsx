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
  const { tableTag, filterTag, listLimit } = useTagPageContext();

  return (
    <>
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
          {tableTag.v.items?.map?.((tag) => (
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
                  <button
                    className={cn(
                      "flex *:m-auto size-[36px] rounded-md cursor-pointer hover:shadow-md duration-150",
                      "border border-gray-300 hover:border-gray-600",
                      "text-gray-600"
                    )}
                    onClick={() => tableTag.onEdit(tag)}
                  >
                    <PenIcon size={16} />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {tableTag.v.items.length === 0 && (
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
                perPage={filterTag.v.limit}
                currentPage={filterTag.v.page}
                total={tableTag.v.total}
                lastPage={tableTag.v.lastPage}
                listLimit={listLimit}
                onLimit={(limit) => tableTag.onLimit(limit)}
                onPrevPage={(page) => tableTag.onChangePage(page)}
                onNextPage={(page) => tableTag.onChangePage(page)}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TableTags;
