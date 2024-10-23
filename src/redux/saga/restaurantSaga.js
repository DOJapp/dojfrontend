import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest"; // Ensure ApiRequest is imported
import { api_url, restaurants } from "../../utils/Constants"; // Adjust these imports based on your API structure
import { Colors } from "../../assets/styles";
import {
  setRestaurants,
  setRestaurant,
  getRestaurants,
  createRestaurantSuccess,
  createRestaurantFailure,
  updateRestaurantSuccess,
  updateRestaurantFailure,
  deleteRestaurantSuccess,
  deleteRestaurantFailure,
} from "../Actions/restaurantActions"; 

// Helper function for displaying alerts
const showAlert = (icon, title, text) => {
  Swal.fire({
    icon,
    title,
    text,
  });
};

// Saga to get all Restaurants
function* getRestaurantsSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + restaurants,
    });

    if (response?.success) {
      yield put(setRestaurants(response.data)); // Dispatch the setRestaurants action
    } else {
      yield put(createRestaurantFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to fetch Restaurants");
    }
  } catch (error) {
    yield put(createRestaurantFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

// Saga to get Restaurant by ID
function* getRestaurantByIdSaga(action) {
  try {
    const { payload } = action;

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${restaurants}/${payload}`,
    });

    if (response?.success) {
      yield put(setRestaurant(response.data));
    } else {
      showAlert("error", "Error", response.message || "Failed to fetch the Restaurant");
    }
  } catch (error) {
    showAlert("error", "Error", error.message);
  }
}

// Saga to delete a Restaurant
function* deleteRestaurantSaga(action) {
  try {
    const { payload } = action;

    const result = yield Swal.fire({
      title: `Are you sure you want to delete this Restaurant?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${restaurants}/${payload}`,
      });

      if (response?.success) {
        yield put(deleteRestaurantSuccess(payload));
        yield put(getRestaurants());
        showAlert("success", "Deleted!", "The Restaurant has been deleted successfully.");
      } else {
        yield put(deleteRestaurantFailure(response.message));
        showAlert("error", "Deletion Failed", "Failed to delete the Restaurant. Please try again.");
      }
    }
  } catch (error) {
    yield put(deleteRestaurantFailure(error.message));
    showAlert("error", "Error", error.message);
  }
}

// Saga to create a Restaurant
function* createRestaurantSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { payload } = action;

    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${restaurants}`,
      data: payload,
    });

    if (response?.success) {
      yield put(createRestaurantSuccess(response.data));
      showAlert("success", "Restaurant Created", "The Restaurant has been successfully created.");
    } else {
      yield put(createRestaurantFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to create Restaurant");
    }
  } catch (error) {
    yield put(createRestaurantFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Saga to update a Restaurant
function* updateRestaurantSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const { id, data } = action.payload;

    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${restaurants}/${id}`,
      data,
    });

    if (response?.success) {
      yield put(updateRestaurantSuccess(response.data));
      showAlert("success", "Restaurant Updated", "The Restaurant has been successfully updated.");
    } else {
      yield put(updateRestaurantFailure(response.message));
      showAlert("error", "Error", response.message || "Failed to update Restaurant");
    }
  } catch (error) {
    yield put(updateRestaurantFailure(error.message));
    showAlert("error", "Error", error.message);
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Root saga to watch for Restaurant-related actions
export default function* restaurantSaga() {
  yield takeLeading(actionTypes.GET_RESTAURANTS, getRestaurantsSaga);
  yield takeLeading(actionTypes.GET_RESTAURANT_BY_ID, getRestaurantByIdSaga);
  yield takeLeading(actionTypes.DELETE_RESTAURANT, deleteRestaurantSaga);
  yield takeLeading(actionTypes.CREATE_RESTAURANT, createRestaurantSaga);
  yield takeLeading(actionTypes.UPDATE_RESTAURANT, updateRestaurantSaga);
}
