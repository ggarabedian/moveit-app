import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import messageReducer from "./message.reducer";

export default combineReducers({
  user: userReducer,
  message: messageReducer,
});
