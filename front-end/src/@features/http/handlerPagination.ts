
function handlerPagination<T>({
  items = [],
  // perPage = 10,
  // currentPage,
  lastPages = 1,
  total = 0
}: {
  items?: T[];
  // perPage?: number;
  // currentPage?: number;
  lastPages?: number;
  total?: number;
}): {
  items: T[];
  // perPage: number;
  // currentPage?: number;
  lastPages: number;
  total: number;
} {
  return {
    items,
    // perPage,
    // currentPage,
    lastPages,
    total
  }
}

export default handlerPagination