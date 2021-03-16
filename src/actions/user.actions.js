import { userService } from "../services/user.service";
import { history } from "../helpers/history";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";
import { ERROR_CATEGORY } from "./categories";

export const login = (username, password) => (dispatch) => {
  return userService
    .login(username, password)
    .then((data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      history.push("/");
    })
    .catch((error) => {
      const message = error.response.data.error_description;

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
        category: ERROR_CATEGORY,
      });
    });
};

export const logout = () => (dispatch) => {
  userService.logout();

  dispatch({
    type: LOGOUT,
  });

  history.push("/");
};

export const authActions = {
  login,
  logout,
};
