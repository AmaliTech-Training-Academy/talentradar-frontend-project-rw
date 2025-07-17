export interface FetchResponse<T> {
    success: boolean;
    message: string;
    data: T;
    pageInfo:{
        page: number;
        size: number;
        totalItems: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
        isFirst: boolean;
        isLast: boolean;
    }
}