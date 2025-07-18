export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type ErrorResponse = {
  success: false;
  message: string;
};

export type SuccessResponse<T> = {
  success: true;
  message?: string;
  data: T;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type PaginatedList<T> = {
  items: T[];
  pagination: Pagination;
};