import {
    MENU_MOBILE_BUTTON,
  } from "../actions/buttons";

const initialState = {
    mobileMenuButton: false,
}

export const buttonsReducer = (state = initialState, action) => {

    switch (action.type) {
        case MENU_MOBILE_BUTTON: {
            return {
                mobileMenuButton: action.mobileMenuButton
            };
        }
        default: {
            return state;
        }
    }
}