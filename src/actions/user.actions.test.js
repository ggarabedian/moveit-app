import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { login, logout } from "./user.actions";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from "./types";
import { ERROR_CATEGORY } from "./categories";

const mockStore = configureMockStore([thunk, promise]);

describe("User Actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {},
    });
  });

  it("dispatches LOGIN action and returns data on success", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: [
          {
            id: 1,
            username: "John",
            access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
          },
        ],
      })
    );

    await store.dispatch(login());
    const action = store.getActions();

    expect.assertions(3);
    expect(action[0].type).toEqual(LOGIN_SUCCESS);
    expect(action[0].payload.user[0].username).toEqual("John");
    expect(action[0].payload.user[0].access_token).toEqual(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    );
  });

  it("dispatches LOGIN action and returns message on failure", async () => {
    mockAxios.post.mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            error_description: "Something went wrong",
          },
        },
      })
    );

    await store.dispatch(login());
    const actions = store.getActions();

    expect.assertions(5);
    expect(actions[0].type).toEqual(LOGIN_FAIL);
    expect(actions[0].payload).toEqual(undefined);
    expect(actions[1].type).toEqual(SET_MESSAGE);
    expect(actions[1].category).toEqual(ERROR_CATEGORY);
    expect(actions[1].payload).toEqual("Something went wrong");
  });

  it("dispatches LOGOUT action", async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({}));

    await store.dispatch(logout());
    const action = store.getActions();

    expect.assertions(1);
    expect(action[0].type).toEqual(LOGOUT);
  });
});
