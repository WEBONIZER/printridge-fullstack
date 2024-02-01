import { combineReducers } from 'redux';
import { refillReducer } from './refill';
import { repairReducer } from './repair';
import { filterReducer } from './filter';
import { buttonsReducer } from './buttons-reducer';

export const rootReducer = combineReducers({
    refill: refillReducer,
    repair: repairReducer,
    filter: filterReducer,
    buttons: buttonsReducer,
});