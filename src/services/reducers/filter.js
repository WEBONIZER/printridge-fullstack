import {
    SEARCH_DATA_REQUEST,
  } from '../actions/filter'
  
  const initialState = {
    filterRequest: true,
    filter: [],
    value: ''
  
  }
  
  export const filterReducer = (state = initialState, action) => {
  
    switch (action.type) {
      case SEARCH_DATA_REQUEST: {
        return {
          ...state,
          filterRequest: true,
          value: action
        };
      }
      default: {
        return state;
      }
    }
  }