export interface Session {
  id: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
  userId: string;
  ipAddress: string;
  deviceInfo: string;
  active: boolean;
  sessionId: string;
  createdAt: string;
}

export interface SessionResponse<T> {
  success: boolean;
  message: string;
  data: {
    items: T;
  };
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

export interface SessionPagination<T> {
  items: T[];
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
