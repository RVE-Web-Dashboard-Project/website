import { configureStore, TypedStartListening } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export default store;