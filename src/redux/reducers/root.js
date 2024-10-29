import { combineReducers } from "redux";
import dashboard from "./dashboard";
import customer from "./customer";
import banner from "./banner";
import errorReducer from "./errorSlice";
import authReducer from "./auth";
import category from "./category";
import product from "./product";
import partner from "./partner";
import tag from "./tag";
const rootReducer = combineReducers({
  dashboard,
  customer,
  banner,
  category,
  product,
  partner,
  tag,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
