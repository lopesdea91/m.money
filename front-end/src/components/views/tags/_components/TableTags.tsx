import { PenIcon } from "lucide-react";
import { useState } from "react";

import { getFinanceTagService } from "@/@features/services/financeTag";
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
import type { FinanceTag } from "@/types";

const TableTags = () => {
  const [tags, setTags] = useState<FinanceTag[]>([]);

  const fetchData = async () => {
    setTags(await getFinanceTagService());
  };

  usePageInit({ title: "Tags", cb: fetchData });
  useTrigger("tableTag", () => fetchData());

  return (
    <Table>
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        <TableRow>
          <TableHead className="">ID</TableHead>
          <TableHead className="">Name</TableHead>
          <TableHead className="">Type</TableHead>
          <TableHead className="text-right text-xs">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell className="text-xs">{tag.id}</TableCell>

            <TableCell className="text-xs">{tag.name}</TableCell>

            <TableCell className="text-xs">{tag.type.name}</TableCell>

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
                    triggerValue({ modalFormTag: true, modalFormTagData: tag });
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

export default TableTags;
