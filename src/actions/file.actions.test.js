import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { upload } from "./file.actions";
import { UPLOAD_FAIL, SET_MESSAGE, UPLOAD_SUCCESS } from "./types";
import { ERROR_CATEGORY, SUCCESS_CATEGORY } from "./categories";

const mockStore = configureMockStore([thunk, promise]);

describe("Test File Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      file: {},
    });
  });

  it("dispatches UPLOAD action and returns data on success", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        folderID: 12345,
        id: "751881658",
        size: "120194",
        originalFilename: "my-image.png",
      })
    );

    await store.dispatch(upload());
    const actions = store.getActions();

    expect.assertions(5);
    expect(actions[0].type).toEqual(UPLOAD_SUCCESS);
    expect(actions[0].payload.file.id).toEqual("751881658");
    expect(actions[1].type).toEqual(SET_MESSAGE);
    expect(actions[1].category).toEqual(SUCCESS_CATEGORY);
    expect(actions[1].payload).toEqual("File Uploaded Successfully!");
  });

  it("dispatches UPLOAD action and returns message on failure", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            detail: "Something went wrong",
          },
        },
      })
    );

    await store.dispatch(upload());
    const actions = store.getActions();

    expect.assertions(5);
    expect(actions[0].type).toEqual(UPLOAD_FAIL);
    expect(actions[0].payload).toEqual(undefined);
    expect(actions[1].type).toEqual(SET_MESSAGE);
    expect(actions[1].category).toEqual(ERROR_CATEGORY);
    expect(actions[1].payload).toEqual("Something went wrong");
  });
});
