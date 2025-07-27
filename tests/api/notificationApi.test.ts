import {
    getAllNotifications,
    markNotificationAsRead,
    dismissNotificationById
} from "@/lib/api/notification";
import { ApiResponse, NotificationsList, Pagination } from "@/lib/types/response";
import { INotification } from "@/lib/types/notification";

// Mock global fetch before each test
beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn();
});

const mockPagination: Pagination = {
    page: 0,
    size: 10,
    totalElements: 2,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
};

const mockNotifications: INotification[] = [
    {
        id: "1",
        category: "INFO",
        eventType: "FEEDBACK",
        title: "Test",
        content: "Hello world",
        sentAt: "2025-07-15T10:30:00Z",
    },
    {
        id: "2",
        category: "SUCCESS",
        eventType: "FEEDBACK",
        title: "Success!",
        content: "Everything is fine.",
        sentAt: "2025-07-15T10:31:00Z",
    },
];

describe("notification API utilities", () => {
    it("fetches all notifications successfully", async () => {
        const mockData: ApiResponse<NotificationsList<INotification>> = {
            success: true,
            data: {
                data: {
                    items: mockNotifications,
                    pagination: mockPagination,
                },
            },
        };

        (fetch as any).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData.data),
        });

        const result = await getAllNotifications();

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.data.items).toHaveLength(2);
            expect(result.data.data.pagination.totalElements).toBe(2);
        }
    });

    it("handles errors while fetching notifications", async () => {
        const mockError: ApiResponse<any> = {
            success: false,
            message: "Unauthorized",
        };

        (fetch as any).mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve(mockError),
        });

        const result = await getAllNotifications();

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.message).toBe("Unauthorized");
        }
    });

    it("marks notification as read successfully", async () => {
        const mockId = "1";
        const mockData: ApiResponse<INotification> = {
            success: true,
            data: {
                ...mockNotifications[0],
                readAt: new Date().toISOString(),
            },
        };

        (fetch as any).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData.data),
        });

        const result = await markNotificationAsRead(mockId);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.id).toBe(mockId);
            expect(result.data.readAt).toBeDefined();
        }
    });

    it("dismisses notification successfully", async () => {
        const mockId = "1";
        const mockData: ApiResponse<INotification> = {
            success: true,
            data: {
                ...mockNotifications[0],
            },
        };

        (fetch as any).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData.data),
        });

        const result = await dismissNotificationById(mockId);

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.id).toBe(mockId);
        }
    });
});