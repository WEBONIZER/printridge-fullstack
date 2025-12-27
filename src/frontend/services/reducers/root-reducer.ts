import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from "react-redux";
import { modalSlice } from "../slices/modal";
import authReducer from "../slices/auth";
import cartridgesReducer from "../slices/cartridges";
import printersReducer from "../slices/printers";
import examplesReducer from "../slices/examples";
import laptopsReducer from "../slices/laptops";
import filterReducer from "../slices/filter";
import buttonsReducer from "../slices/buttons";

export const rootStore = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    auth: authReducer,
    cartridges: cartridgesReducer,
    printers: printersReducer,
    examples: examplesReducer,
    laptops: laptopsReducer,
    filter: filterReducer,
    buttons: buttonsReducer,
  },
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export const useDispatch_ = useDispatch.withTypes<typeof rootStore.dispatch>();
export const useSelector_ = useSelector.withTypes<ReturnType<typeof rootStore.getState>>();
export const useStore_ = useStore.withTypes<ReturnType<() => typeof rootStore>>();