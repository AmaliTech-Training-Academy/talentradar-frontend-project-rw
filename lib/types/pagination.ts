export interface PaginationObj {
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  empty: boolean;
}


export interface PageInfo {
  page: number;
  totalPages: number;
  // hasNext: boolean;
  // hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
  size: number;
  totalItems: number;
}

export interface PaginationControlsProps {
  pageInfo: PageInfo;
  onPageChange: (page: number) => void;
}

export interface PaginationState {
  [tableKey: string]: number;
}
