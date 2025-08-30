import { type ReactNode } from "react";

import { triggerValue } from "@/@features/services/triggers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStore } from "@/hooks/useStore";
import type { TriggerValueKeys } from "@/types";

export const Modal = ({
  children,
  title,
  className,
  keyOpen,
}: {
  children: ReactNode;
  title?: string;
  className?: string;
  keyOpen: TriggerValueKeys;
}) => {
  const { triggers } = useStore();

  const isOpen = !!triggers?.[keyOpen];

  function onChange(currentOpen: boolean) {
    triggerValue({ [keyOpen]: currentOpen });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className={className}>
        <DialogHeader>
          {title ? <DialogTitle>{title}</DialogTitle> : <DialogTitle />}
          <DialogDescription />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
