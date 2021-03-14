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

export const userService = {
  login,
};
