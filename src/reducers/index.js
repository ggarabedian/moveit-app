import { combineReducers } from "redux";
import authReducer from "./user.reducer";

export default combineReducers({
  user: userReducer,
});
