import { UPLOAD_SUCCESS, UPLOAD_FAIL } from "../actions/types";

// Make it for file?!
// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

export default function fileReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_SUCCESS:
      return {
        ...state,
        file: payload.file,
      };
    case UPLOAD_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
