import { userService } from "../services/user.service";
import { history } from "../helpers/history";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

export const login = (username, password) => (dispatch) => {
  return userService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      history.push("/upload");

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

export const authActions = {
  login,
};
