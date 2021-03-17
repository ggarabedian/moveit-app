import http from "../apis/http";

const login = async (username, password) => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", username);
  params.append("password", password);

  const response = await http.post("/token", params);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  }

  throw new Error("An unexpecter error has occurred");
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
    try {
      await revokeToken(user.access_token);
    } finally {
      localStorage.removeItem("user");
    }
  }
};

const revokeToken = (token) => {
  const params = new URLSearchParams();
  params.append("token", token);

  return http.post("/token/revoke", params);
};

const getUserDetails = async () => {
  const config = getRequestConfig();

  try {
    const response = await http.get("/users/self", config);
    return response;
  } catch (error) {
    console.log(error);
  }
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
