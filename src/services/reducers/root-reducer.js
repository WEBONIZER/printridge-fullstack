import { combineReducers } from 'redux';
import { refillReducer } from './refill';
import { repairReducer } from './repair';
import { filterReducer } from './filter';

export const rootReducer = combineReducers({
    refill: refillReducer,
    repair: repairReducer,
    filter: filterReducer,
});