import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatTagsIds, formatValue } from "@/utils/financeOrder";
import { cn } from "@/utils/utils";
import { PenIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useDashboardPageContext } from "../page.context";

function SumTags() {
  const navigate = useNavigate();
  const {
    tableOrder,
    data: { sumTags },
  } = useDashboardPageContext();

  return (
    <div
      className={cn(
        "overflow-y-scroll py-2 px-1",
        "border border-gray-300 rounded shadow-sm"
      )}
    >
      <Table>
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
  );
}

export default SumTags;
