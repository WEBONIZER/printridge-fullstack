import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { refillReducer } from './refill';
import { repairReducer } from './repair';
import { filterReducer } from './filter';
import { buttonsReducer } from './buttons-reducer';
import { useDispatch, useSelector, useStore } from "react-redux";
import { modalSlice } from "../slices/modal";

export const rootReducer = combineReducers({
  refill: refillReducer,
  repair: repairReducer,
  filter: filterReducer,
  buttons: buttonsReducer,
  modalSlice: modalSlice.reducer,
});

export const rootStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export const useDispatch_ = useDispatch.withTypes<typeof rootStore.dispatch>();
export const useSelector_ = useSelector.withTypes<ReturnType<typeof rootStore.getState>>();
export const useStore_ = useStore.withTypes<ReturnType<() => typeof rootStore>>();