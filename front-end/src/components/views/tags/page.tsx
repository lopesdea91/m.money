import { Modal } from "@/components/Modal";
import PageTitle from "@/components/PageTitle";
import FormTag from "./_components/FormTag";
import FormTagSearch from "./_components/FormTagSearch";
import TableTags from "./_components/TableTags";
import { TagPageContextProvider } from "./page.provider";

export const TagsView = () => {
  return (
    <TagPageContextProvider>
      <PageTitle label="Tags" className="justify-between">
        <FormTagSearch />
      </PageTitle>

      <TableTags />

      <Modal keyOpen="modalFormTag" title="Tag">
        <FormTag />
      </Modal>
    </TagPageContextProvider>
  );
};
