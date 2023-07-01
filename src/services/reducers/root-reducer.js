import { combineReducers } from 'redux';
import { refillReducer } from './refill';
import { repairReducer } from './repair';

export const rootReducer = combineReducers({
    refill: refillReducer,
    repair: repairReducer,
});