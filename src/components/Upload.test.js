import React from "react";
import * as Redux from "react-redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import configureMockStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Upload from "./Upload";

const mockStore = configureMockStore([thunk, promise]);

describe("Test Upload Components", () => {
  const realUseState = React.useState;
  const useSelectorMock = jest.spyOn(Redux, "useSelector");
  const useStateMock = jest.spyOn(React, "useState");
  global.URL.createObjectURL = jest.fn();

  let file;
  let store;

  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      isLoggedIn: true,
    });
    useStateMock.mockImplementationOnce(() =>
      realUseState([selectedFile, file])
    );
    store = mockStore({
      user: {},
      message: {},
    });
  });

  it("renders upload screen correcty when no file is selected", () => {
    render(
      <Redux.Provider store={store}>
        <Upload />
      </Redux.Provider>
    );

    expect.assertions(1);
    expect(screen.getByText("No file selected")).toBeInTheDocument();
  });

  it("renders upload screen with preview when the selected file is an image", () => {
    render(
      <Redux.Provider store={store}>
        <Upload />
      </Redux.Provider>
    );

    const file = new File(["my-image"], "my-image.png", { type: "image/png" });
    const fileInput = screen.getByLabelText("Choose a File");
    userEvent.upload(fileInput, file);

    expect.assertions(2);
    expect(screen.getByText("Preview")).toBeInTheDocument();
    expect(screen.getByText("my-image.png")).toBeInTheDocument();
  });

  it("renders upload screen without preview when the selected file is not an image", () => {
    render(
      <Redux.Provider store={store}>
        <Upload />
      </Redux.Provider>
    );

    const file = new File(["my-document"], "my-document.pdf", {
      type: "application/pdf",
    });
    const fileInput = screen.getByLabelText("Choose a File");
    userEvent.upload(fileInput, file);

    expect.assertions(2);
    expect(
      screen.getByText("No preview available for the selected file format")
    ).toBeInTheDocument();
    expect(screen.getByText("my-document.pdf")).toBeInTheDocument();
  });
});
