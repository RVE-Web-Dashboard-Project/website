import { configureStore, TypedStartListening } from "@reduxjs/toolkit";

import localStorageMiddleware from "./middlewares/localStorageMiddleware";
import commandsReducer from "./slices/commandsSlice";
import coordinatorsReducer from "./slices/coordinatorsSlice";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    coordinators: coordinatorsReducer,
    commands: commandsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>

export default store;