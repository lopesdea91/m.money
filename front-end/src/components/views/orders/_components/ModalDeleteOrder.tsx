import { Button } from "@/components/ui/button";
import { useOrderPageContext } from "../page.context";

const ConfirmDelete = () => {
  const { modalDeleteOrder } = useOrderPageContext();

  return (
    <div>
      <div>Do you really want to delete?</div>

      <div className="flex items-center justify-end gap-2 border-t pt-4">
        <Button type="button" onClick={() => modalDeleteOrder.onClose()}>
          Cancel
        </Button>

        <Button type="button" onClick={() => modalDeleteOrder.onDelete()}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
