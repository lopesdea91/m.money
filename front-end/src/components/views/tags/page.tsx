import { Modal } from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import ButtonActionsTag from "./_components/ButtonActionsTag";
import FilterTag from "./_components/FilterTag";
import FormTag from "./_components/FormTag";
import TableTags from "./_components/TableTags";
import { TagPageContextProvider } from "./page.provider";

export const TagsView = () => {
  return (
    <TagPageContextProvider>
      <PageTitle label="Tags" className="justify-between">
        <ButtonActionsTag />
      </PageTitle>

      <TableTags />

      <Modal keyOpen="modalFormTag" title="Tag">
        <FormTag />
      </Modal>

      <Modal keyOpen="modalFilterTag" title="Filter tag" className="w-[320px]">
        <FilterTag />
      </Modal>
    </TagPageContextProvider>
  );
};
