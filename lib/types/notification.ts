export interface INotification {
    id: string;
    type: string;
    category: string;
    event_type: string;
    content: string;
    sent_at: string;
}

export interface INotificationApiResponse {
    success: boolean;
    data: INotification[];
    pagination: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    }
}