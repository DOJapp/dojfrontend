import { combineReducers } from "redux";
import dashboard from "./dashboard";
import customer from "./customer";
import banner from "./banner";
import errorReducer from "./errorSlice";
import authReducer from "./auth";
import category from "./category";
import product from "./product";
import restaurant from "./restaurant";

const rootReducer = combineReducers({
  dashboard,
  customer,
  banner,
  category,
  product,
  restaurant,
  error: errorReducer,
  auth: authReducer,
});

export default rootReducer;
