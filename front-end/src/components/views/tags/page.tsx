import { PlusIcon } from "lucide-react";

import { triggerValue } from "@/@features/services/triggers";
import PageTitle from "@/components/PageTitle";
import ModalFormTag from "./_components/ModalFormTag";
import TableTags from "./_components/TableTags";

export const TagsView = () => {
  return (
    <>
      <PageTitle label="Tags" className="justify-between">
        <button
          className="cursor-pointer border rounded size-[24px] flex *:m-auto"
          onClick={() =>
            triggerValue({ modalFormTag: true, modalFormTagData: {} })
          }
        >
          <PlusIcon size={18} />
        </button>
      </PageTitle>

      <TableTags />

      <ModalFormTag />
    </>
  );
};
