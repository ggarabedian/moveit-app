import express from "../apis/express";

const login = (username, password) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);

  return express.post("/token", params).then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const logout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  revokeToken(user.access_token)
    .then((response) => {
      localStorage.removeItem("user");
    })
    .catch((error) => {
      localStorage.removeItem("user");
    });
};

const revokeToken = (token) => {
  const params = new URLSearchParams();
  params.append("token", token);

  return express.post("/token/revoke", params);
};

const getUserDetails = () => {
  const config = getRequestConfig();

  return express.get("/users/self", config);
};

const getRequestConfig = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
    const config = {
      headers: {
        Authorization: "Bearer " + user.access_token,
      },
    };

    return config;
  } else {
    return {};
  }
};

export const userService = {
  login,
  logout,
  getRequestConfig,
  getUserDetails,
};
