import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { useNotifications } from "@/lib/hooks/use-notifications";
import * as api from "@/lib/api/notification";
import { INotification } from "@/lib/types/notification";
import notificationReducer from "@/lib/features/notificationSlice";
import { configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const createMockNotification = (overrides: Partial<INotification> = {}): INotification => ({
    id: "notif-1",
    category: "INFO",
    eventType: "OTHER",
    title: "Default Title",
    content: "Default Content",
    sentAt: new Date().toISOString(),
    readAt: undefined,
    ...overrides,
});

const makeStore = () =>
    configureStore({
        reducer: {
            notifications: notificationReducer,
        },
    });

const mockPagination = {
    page: 0,
    size: 10,
    totalElements: 2,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
};

vi.mock("sonner", () => ({
    toast: {
        error: vi.fn(),
        success: vi.fn(),
        info: vi.fn(),
    },
}));

vi.mock("@/lib/api/notification");

describe("useNotifications", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <Provider store={makeStore()}>{children}</Provider>
    );

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("fetches initial notifications", async () => {
        const mockNotifications = [
            createMockNotification({ id: "1", title: "Test 1" }),
            createMockNotification({ id: "2", title: "Test 2" }),
        ];

        vi.spyOn(api, "getAllNotifications").mockResolvedValue({
            success: true,
            data: {
                data: {
                    items: mockNotifications,
                    pagination: { ...mockPagination, totalElements: 2 },
                }
            },
            message: "Fetched"
        });

        const { result } = renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => {
            expect(result.current.notifications).toHaveLength(2);
        });

        expect(result.current.totalNotifications).toBe(2);
    });

    it("marks a notification as read", async () => {
        const mockNotification = createMockNotification({ id: "1" });

        vi.spyOn(api, "getAllNotifications").mockResolvedValue({
            success: true,
            data: {
                data: {
                    items: [mockNotification],
                    pagination: { ...mockPagination, totalElements: 1 },
                }
            },
            message: "Fetched"
        });

        vi.spyOn(api, "markNotificationAsRead").mockResolvedValue({
            success: true,
            message: "Marked as read",
            data: mockNotification
        });

        const { result } = renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => {
            expect(result.current.notifications.length).toBe(1);
        });

        await act(async () => {
            await result.current.markAsRead("1");
        });

        const updated = result.current.notifications.find(n => n.id === "1");
        expect(updated?.readAt).toBeDefined();
    });

    it("dismisses a notification", async () => {
        const mockNotification = createMockNotification({ id: "3" });

        vi.spyOn(api, "getAllNotifications").mockResolvedValue({
            success: true,
            data: {
                data: {
                    items: [mockNotification],
                    pagination: { ...mockPagination, totalElements: 1 },
                }
            },
            message: "Fetched"
        });

        vi.spyOn(api, "dismissNotificationById").mockResolvedValue({
            success: true,
            message: "Dismissed",
            data: mockNotification
        });

        const { result } = renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => {
            expect(result.current.notifications).toHaveLength(1);
        });

        await act(async () => {
            await result.current.dismissNotification("3");
        });

        await waitFor(() => {
            expect(result.current.notifications).toHaveLength(0);
        });
    });

    it("shows error when fetching notifications fails", async () => {
        vi.spyOn(api, "getAllNotifications").mockResolvedValue({
            success: false,
            message: "Failed to fetch notifications",
        });

        renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith("Failed to fetch notifications");
        });
    });

    it("shows error when marking as read fails", async () => {
        const mockNotification = createMockNotification({ id: "4" });

        vi.spyOn(api, "getAllNotifications").mockResolvedValue({
            success: true,
            data: {
                data: {
                    items: [mockNotification],
                    pagination: { ...mockPagination, totalElements: 1 },
                }
            },
            message: "Fetched"
        });

        vi.spyOn(api, "markNotificationAsRead").mockResolvedValue({
            success: false,
            message: "Failed to mark notification as read",
        });

        const { result } = renderHook(() => useNotifications(), { wrapper });

        await waitFor(() => {
            expect(result.current.notifications.length).toBe(1);
        });

        await act(async () => {
            await result.current.markAsRead("4");
        });

        expect(toast.error).toHaveBeenCalledWith("Failed to mark notification as read");
        expect(result.current.notifications[0].readAt).toBeUndefined();
    });
});