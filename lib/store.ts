import { configureStore } from '@reduxjs/toolkit'
import paginationReducer from "./features/paginationslice"
import notificationsReducer from "./features/notificationSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
      pagination: paginationReducer,
      notifications: notificationsReducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']