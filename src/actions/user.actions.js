import { userService } from "../services/user.service";
import { history } from "../helpers/history";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";
import { ERROR_CATEGORY } from "./categories";

export const login = (username, password) => async (dispatch) => {
  try {
    const response = await userService.login(username, password);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: response },
    });

    history.push("/");
  } catch (error) {
    const message = error.response.data.error_description;

    dispatch({
      type: LOGIN_FAIL,
    });

    dispatch({
      type: SET_MESSAGE,
      payload: message,
      category: ERROR_CATEGORY,
    });
  }
};

export const logout = () => async (dispatch) => {
  await userService.logout();

  dispatch({
    type: LOGOUT,
  });

  history.push("/");
};

export const authActions = {
  login,
  logout,
};
