import { all } from "redux-saga/effects";
import bannerSaga from "./bannerSaga";
import dashboardSaga from "./dashboardSaga";
import authSaga from "./authSaga";
import categorySaga from "./categorySaga";
import productSaga from "./productSaga";
import restaurantSaga from "./restaurantSaga";
export default function* rootSaga() {
  yield all([
    bannerSaga(),
    dashboardSaga(),
    authSaga(),
    categorySaga(),
    productSaga(),
    restaurantSaga(),
  ]);
}
