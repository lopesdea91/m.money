import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTagsIds, formatValue } from "@/utils/financeOrder";
import { cn } from "@/utils/utils";
import { PenIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useDashboardPageHook } from "../page.hook";

function SumTags() {
  const navigate = useNavigate();
  const {
    triggerValue,
    tableOrder,
    data: { sumTags },
  } = useDashboardPageHook();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-6 hidden">
        {sumTags.map((sumType) => (
          <div
            key={sumType.key}
            className={cn(
              "grid gap-2 p-4",
              "border border-gray-300 rounded shadow-sm"
            )}
          >
            <span className="font-thin text-lg">{sumType.key}</span>
            <span className="font-semibold font-mono text-2xl text-gray-700 truncate ">
              {formatValue(sumType.value)}
            </span>
          </div>
        ))}
      </div>

      <div className="md:col-span-1 max-h-[380px] overflow-y-scroll pr-2">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Names</TableHead>
              <TableHead>Values</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sumTags.map((sumTag) => (
              <TableRow key={sumTag.key}>
                <TableCell className="text-xs">
                  {formatTagsIds(sumTag.tagIds)}
                </TableCell>

                <TableCell className="text-xs">
                  {formatValue(sumTag.value)}
                </TableCell>

                <TableCell className="text-xs"></TableCell>

                <TableCell className="">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="cursor-pointer border size-[24px] flex *:m-auto"
                      onClick={() => {
                        tableOrder.stored().destroy();
                        tableOrder.stored().set({
                          tagIds: sumTag.tagIds,
                        });
                        navigate("/order");
                      }}
                    >
                      <PenIcon size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default SumTags;
