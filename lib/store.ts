import { combineReducers, configureStore } from "@reduxjs/toolkit";
import paginationReducer from "./features/paginationslice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./features/authSlice";
import notificationReducer from "./features/notificationSlice";

const rootReducer = combineReducers({
  pagination: paginationReducer,
  auth: authReducer,
  notifications: notificationReducer,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
