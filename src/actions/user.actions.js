import { userService } from "../services/user.service";
import { history } from "../helpers/history";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";

export const login = (username, password) => (dispatch) => {
  return userService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      history.push("/");

      return Promise.resolve();
    },
    (error) => {
      const errorMessage = error.message || error.toString();

      dispatch({
        type: LOGIN_FAIL,
        payload: errorMessage,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  userService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const authActions = {
  login,
  logout,
};
