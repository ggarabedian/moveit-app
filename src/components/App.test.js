import React from "react";
import * as reactRedux from "react-redux";
import configureMockStore from "redux-mock-store";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./App";

const mockStore = configureMockStore([thunk, promise]);

describe("Test Login and Upload Components", () => {
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it("renders login screen", () => {
    useSelectorMock.mockReturnValue({
      isLoggedIn: false,
    });
    render(<App />);

    expect.assertions(1);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("renders upload screen", () => {
    useSelectorMock.mockReturnValue({
      isLoggedIn: true,
    });
    render(<App />);

    expect.assertions(3);
    expect(screen.getByText("Choose a File")).toBeInTheDocument();
    expect(screen.getByText("No file selected")).toBeInTheDocument();
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });
});
