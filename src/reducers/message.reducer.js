import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = {};

export default function messageReducer(state = initialState, action) {
  const { type, payload, category } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload, category: category };
    case CLEAR_MESSAGE:
      return { message: "", category: "" };
    default:
      return state;
  }
}
