export interface INotification {
    id: string;
    category: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
    event_type: 'FEEDBACK' | 'ASSESSMENT' | 'AI_SCORE' | 'OTHER';
    title: string;
    content: string;
    sent_at: string;
    read_at?: string;
}

export interface INotificationApiResponse {
    success: boolean;
    message?: string;
    data: {
        notifications: INotification[] | null;
        pagination?: {
            page: number;
            size: number;
            totalElements: number;
            totalPages: number;
            hasNext: boolean;
            hasPrevious: boolean;
        };
    };
    errors: string | null;
}