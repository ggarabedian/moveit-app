import React from "react";
import * as reactRedux from "react-redux";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("Test App Component", () => {
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

    expect.assertions(3);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
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
