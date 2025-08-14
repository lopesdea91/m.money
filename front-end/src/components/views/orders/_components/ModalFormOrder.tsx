import { triggerValue } from "@/@features/services/triggers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/hooks/useStore";
import { useTrigger } from "@/hooks/useTriggers";

const ModalFormOrder = () => {
  const { triggers } = useStore();

  useTrigger<boolean>("modalFormOrder", (open) => {
    if (open) return;
    triggerValue({ modalFormOrder: false, modalFormOrderData: {} });
  });

  return (
    <Dialog
      open={!!triggers?.["modalFormOrder"]}
      onOpenChange={(open) => {
        triggerValue({ modalFormOrder: open });
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Order</DialogTitle>
          <DialogDescription />
          <FormOrder />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormOrder;
