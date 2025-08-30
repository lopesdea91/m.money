
function handlerPagination<T>({
  items = [],
  // perPage = 10,
  // currentPage,
  lastPage = 1,
  total = 0
}: {
  items?: T[];
  // perPage?: number;
  // currentPage?: number;
  lastPage?: number;
  total?: number;
}): {
  items: T[];
  // perPage: number;
  // currentPage?: number;
  lastPage: number;
  total: number;
} {
  return {
    items,
    // perPage,
    // currentPage,
    lastPage,
    total
  }
}

export default handlerPagination