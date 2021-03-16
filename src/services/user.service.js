import http from "../apis/http";

const login = (username, password) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);

  return http.post("/token", params).then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

const logout = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
    revokeToken(user.access_token)
      .then((response) => {
        localStorage.removeItem("user");
      })
      .catch((error) => {
        localStorage.removeItem("user");
      });
  }
};

const revokeToken = (token) => {
  const params = new URLSearchParams();
  params.append("token", token);

  return http.post("/token/revoke", params);
};

const getUserDetails = () => {
  const config = getRequestConfig();

  return http.get("/users/self", config);
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
  }

  return {};
};

export const userService = {
  login,
  logout,
  getRequestConfig,
  getUserDetails,
};
