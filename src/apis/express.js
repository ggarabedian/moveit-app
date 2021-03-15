import axios from "axios";
import store from "../helpers/store";

import { logout } from "../actions/user.actions";
import { setMessage } from "../actions/message.actions";
import { ERROR_CATEGORY } from "../actions/categories";

const express = axios.create({
  baseURL: "http://localhost:3000",
});

// Intercepts all requests and logs the user out when the
// access token (session) has expired (401 Unauthorized errors)
express.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      store.dispatch(
        setMessage(
          "Your session has expired... logging you out.",
          ERROR_CATEGORY
        )
      );

      setTimeout(function () {
        store.dispatch(logout());
      }, 3000);

      store.dispatch(
        setMessage(
          "Your session has expired. Please re-enter your credentials to log back in.",
          ERROR_CATEGORY
        )
      );
    }

    return Promise.reject(error);
  }
);

export default express;
