import * as React from "react";

import { cn } from "@/utils/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Select } from "./select";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}
function TablePagination({
  perPage,
  currentPage,
  total,
  lastPage,
  listLimit,
  onLimit,
  onPrevPage,
  onNextPage,
}: {
  perPage: number;
  currentPage: number;
  total: number;
  lastPage: number;
  listLimit: { value: string; label: string }[];
  onLimit: (v: number) => void;
  onPrevPage: (v: number) => void;
  onNextPage: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Select
        placeholder="Limit"
        value={perPage?.toString?.()}
        onChange={(v) => onLimit(+v)}
        options={listLimit}
        className="w-fit"
      />
      <button
        className="p-2 border rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={() => onPrevPage(Number(currentPage) - 1)}
      >
        <ChevronLeftIcon size={18} />
      </button>
      <button
        className="p-2 border rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === lastPage}
        onClick={() => onNextPage(Number(currentPage) + 1)}
      >
        <ChevronRightIcon size={18} />
      </button>

      <span className="ml-auto text-xs">Total: {total}</span>
    </div>
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
};
