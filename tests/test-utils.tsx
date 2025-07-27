// tests/test-utils.ts
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "@/lib/features/notificationSlice";
import { renderHook } from "@testing-library/react";

// Factory to create a store for each test
export const makeStore = () =>
  configureStore({
    reducer: {
      notifications: notificationReducer,
    },
  });

export function wrapperWithStore(store: ReturnType<typeof makeStore>) {
  return ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );
}

// Helper to render a hook with Redux store
export function renderHookWithStore<T>(hook: () => T) {
  const store = makeStore();
  const wrapper = wrapperWithStore(store);
  const result = renderHook(() => hook(), { wrapper });
  return { store, ...result };
}