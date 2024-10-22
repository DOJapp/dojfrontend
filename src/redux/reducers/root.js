import { combineReducers } from "redux";
import dashboard from "./dashboard";
import customer from "./customer";
import banner from "./banner";
import errorReducer from "./errorSlice";
import authReducer from "./auth";
import category from "./category";
const rootReducer = combineReducers({
  dashboard,
  customer,
  banner,
  category,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
