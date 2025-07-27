import reducer, {
    setNotifications,
    addNotification,
    markAsRead,
    dismissNotification,
    setLoading,
    setError
} from "@/lib/features/notificationSlice"
import { NotificationCategory, NotificationEventType } from "@/lib/types/notification"

const fakeNotification = {
    id: "123",
    title: "Test Notification",
    content: "Some content",
    category: "INFO" as NotificationCategory,
    eventType: "FEEDBACK" as NotificationEventType,
    sentAt: new Date().toISOString(),
}

describe("notificationSlice", () => {
    it("should handle setNotifications", () => {
        const state = reducer(undefined, setNotifications([fakeNotification]))
        expect(state.notifications.length).toBe(1)
    })

    it("should handle addNotification", () => {
        const state = reducer(undefined, addNotification(fakeNotification))
        expect(state.notifications[0]).toEqual(fakeNotification)
    })

    it("should mark a notification as read", () => {
        const state = reducer({ notifications: [fakeNotification], loading: false, error: null }, markAsRead("123"))
        expect(state.notifications[0].readAt).toBeDefined()
    })

    it("should dismiss a notification", () => {
        const state = reducer({ notifications: [fakeNotification], loading: false, error: null }, dismissNotification("123"))
        expect(state.notifications).toHaveLength(0)
    })

    it("should handle setLoading and setError", () => {
        let state = reducer(undefined, setLoading(true))
        expect(state.loading).toBe(true)

        state = reducer(state, setError("Something went wrong"))
        expect(state.error).toBe("Something went wrong")
    })
})