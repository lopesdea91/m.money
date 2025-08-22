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

const ModalFormTag = () => {
  const { triggers } = useStore();

  useTrigger<boolean>("modalFormTag", (open) => {
    if (open) return;
    triggerValue({ modalFormTag: false, modalFormTagData: {} });
  });

  return (
    <Dialog
      open={!!triggers?.["modalFormTag"]}
      onOpenChange={(open) => {
        triggerValue({ modalFormTag: open });
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tag</DialogTitle>
          <DialogDescription />
          {/* <FormTag /> */}
          aaaaaaaaaaa
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModalFormTag;
