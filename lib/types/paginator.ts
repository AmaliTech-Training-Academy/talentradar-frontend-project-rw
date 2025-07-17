export interface PageInfo {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
  size: number;
  totalItems: number;
}

export interface PaginationControlsProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}
