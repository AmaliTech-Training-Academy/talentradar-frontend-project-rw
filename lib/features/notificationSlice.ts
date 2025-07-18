import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "../types/notification";

interface NotificationsState {
    notifications: INotification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationsState = {
    notifications: [],
    loading: false,
    error: null
}

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<INotification[]>) => {
            state.notifications = action.payload;
        },
        addNotification: (state, action: PayloadAction<INotification>) => {
            state.notifications.unshift(action.payload);
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if(notification) notification.readAt = new Date().toISOString();
        },
        dismissNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const {
    setNotifications,
    addNotification,
    markAsRead,
    dismissNotification,
    setLoading,
    setError
} = notificationsSlice.actions

export default notificationsSlice.reducer;