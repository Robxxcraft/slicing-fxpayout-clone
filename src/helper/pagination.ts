export const getPagination = ({
    maxButtons = 5, currentPage, TOTAL_PAGES
  }: {
    maxButtons?: number; currentPage: number; TOTAL_PAGES: number
  }) => {
  const half = Math.floor(maxButtons / 2);
  let start = currentPage - half;
  let end = currentPage + half;
  if (start < 1) {
    start = 1;
    end = maxButtons;
  }
  if (end > TOTAL_PAGES) {
    end = TOTAL_PAGES;
    start = TOTAL_PAGES - maxButtons + 1;
  }
  start = Math.max(1, start);
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
}