import {
    MENU_MOBILE_BUTTON,
    PHOTO_BUTTON,
    VIDEO_BUTTON
  } from "../actions/buttons";

const initialState = {
    mobileMenuButton: false,
    photoButton: 'photo',
    videoButton: '',
}

export const buttonsReducer = (state = initialState, action) => {

    switch (action.type) {
        case MENU_MOBILE_BUTTON: {
            return {
                mobileMenuButton: action.mobileMenuButton
            };
        }
        case PHOTO_BUTTON: {
            return {
              ...state,
              photoButton: action.photoButton,
            };
          }
          case VIDEO_BUTTON: {
            return {
              ...state,
              videoButton: action.videoButton,
            };
          }
        default: {
            return state;
        }
    }
}