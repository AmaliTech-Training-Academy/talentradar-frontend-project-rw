export interface FetchResponse<T> {
    success: boolean;
    message: string;
    data: T;
}