import {
    MENU_MOBILE_BUTTON,
    PHOTO_BUTTON,
    VIDEO_BUTTON
  } from "../actions/buttons";

const initialState = {
    photoButton: 'photo',
    videoButton: '',
}

export const buttonsReducer = (state = initialState, action) => {

    switch (action.type) {
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