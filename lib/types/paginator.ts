export interface PageInfo {
  page: number;
  totalPages: number;
}

export interface PaginationControlsProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}
