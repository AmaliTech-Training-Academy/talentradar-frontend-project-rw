import {
    getAllNotifications,
    markNotificationAsRead,
    dismissNotificationById
} from "@/lib/api/notification";
import { http, HttpResponse } from "msw";
import { server } from "@/tests/server"; // adjust path

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";

describe("Notification API", () => {
    it("fetches all notifications", async () => {
        const response = await getAllNotifications();
        expect(response.success).toBe(true);
        if (response.success) {
            expect(response.data.items.length).toBe(3);
            expect(response.data.items[0].title).toBe("New feedback");
            expect(response.data.items[0].category).toBe("SUCCESS");
            expect(response.data.items[0].eventType).toBe("FEEDBACK");
            expect(response.data.pagination.totalElements).toBe(3);
            expect(response.data.pagination.page).toBe(1);
        }
    });

    it("marks a notification as read", async () => {
        const notificationId = "550e8400-e29b-41d4-a716-446655440000";
        const response = await markNotificationAsRead(notificationId);
        expect(response.success).toBe(true);
        if (response.success) {
            expect(response.data.id).toBe(notificationId);
            expect(response.message).toBe("Notification marked as read");
        }
    });

    it("dismisses a notification", async () => {
        const notificationId = "550e8400-e29b-41d4-a716-446655440001";
        const response = await dismissNotificationById(notificationId);
        expect(response.success).toBe(true);
        if (response.success) {
            expect(response.data.id).toBe(notificationId);
            expect(response.message).toBe("Notification dismissed");
        }
    });

    it("handles API error gracefully for getAllNotifications", async () => {
        server.use(
            http.get(`${API_BASE}/notifications`, () => {
                return HttpResponse.json(
                    { success: false, message: "Internal server error" },
                    { status: 500 }
                );
            })
        );

        const response = await getAllNotifications();
        expect(response.success).toBe(false);
        if (!response.success) {
            expect(response.message).toBeDefined();
        }
    });

    it("handles API error gracefully for markNotificationAsRead", async () => {
        const notificationId = "invalid-id";
        server.use(
            http.patch(`${API_BASE}/notifications/${notificationId}/read`, () => {
                return HttpResponse.json(
                    { success: false, message: "Notification not found" },
                    { status: 404 }
                );
            })
        );

        const response = await markNotificationAsRead(notificationId);
        expect(response.success).toBe(false);
        if (!response.success) {
            expect(response.message).toBe("An unknown error occurred");
        }
    });

    it("handles API error gracefully for dismissNotificationById", async () => {
        const notificationId = "invalid-id";
        server.use(
            http.patch(`${API_BASE}/notifications/${notificationId}/dismiss`, () => {
                return HttpResponse.json(
                    { success: false, message: "An unknown error occurred" },
                    { status: 404 }
                );
            })
        );

        const response = await dismissNotificationById(notificationId);
        expect(response.success).toBe(false);
        if (!response.success) {
            expect(response.message).toBe("An unknown error occurred");
        }
    });

    it("handles network errors", async () => {
        server.use(
            http.get(`${API_BASE}/notifications`, () => {
                return HttpResponse.error();
            })
        );

        const response = await getAllNotifications();
        expect(response.success).toBe(false);
        if (!response.success) {
            expect(response.message).toBeDefined();
        }
    });
});