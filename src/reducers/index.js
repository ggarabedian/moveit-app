import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import messageReducer from "./message.reducer";
import fileReducer from "./file.reducer";

export default combineReducers({
  user: userReducer,
  message: messageReducer,
  file: fileReducer,
});
