import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";

export const rootStore = configureStore({
  reducer: rootReducer,
  devTools: true,
});
