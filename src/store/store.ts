import { configureStore } from "@reduxjs/toolkit";
import AppSlice from "./createSlice";

export const store = configureStore({
  reducer: {
    counter: AppSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
