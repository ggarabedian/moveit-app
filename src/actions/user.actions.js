import { userService } from "../services/user.service";
import { history } from "../helpers/history";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";

export const login = (username, password) => (dispatch) => {
  return userService
    .login(username, password)
    .then((data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      console.log(data);
      history.push("/");

      return Promise.resolve();
    })
    .catch((error) => {
      const errorMessage = error.response.data.error_description;

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: errorMessage,
      });

      return Promise.reject();
    });
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
