import { SET_MESSAGE, CLEAR_MESSAGE } from "./types";

export const setMessage = (message, category) => ({
  type: SET_MESSAGE,
  payload: message,
  category: category,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
