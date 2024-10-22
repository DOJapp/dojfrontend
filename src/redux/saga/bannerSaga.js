import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest"; // Ensure ApiRequest is imported
import { api_url, banner } from "../../utils/Constants"; // Adjust these imports based on your API structure
import { Colors } from "../../assets/styles";
import {
  setBanners,
  setBanner,
  getBanners,
  createBannerSuccess,
  createBannerFailure,
  updateBannerSuccess,
  updateBannerFailure,
  deleteBannerSuccess,
  deleteBannerFailure,
} from "../Actions/bannerActions.js"; // Update import path to the correct action file

function* getBannersSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + banner, // Adjust the API endpoint for banners
    });

    if (response?.success) {
      // console.log("response", response);
      yield put(setBanners(response.data)); // Dispatch the setBanners action
    } else {
      yield put(createBannerFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch banners",
      });
    }
  } catch (error) {
    yield put(createBannerFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

function* getBannerByIdSaga(action) {
  try {
    const { payload } = action; // Assuming the action contains the banner ID
    
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${banner}/${payload}`, 
    });

    if (response?.success) {
      yield put(setBanner(response.data)); // Dispatch the setBanner action
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch the banner",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

function* deleteBannerSaga(action) {
  try {
    const { payload } = action;

    // Display the confirmation alert
    const result = yield Swal.fire({
      title: `Are you sure you want to delete this banner?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    // If user confirmed the deletion
    if (result.isConfirmed) {
      // Call API to delete the banner by ID
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${banner}/${payload}`, // Ensure correct API URL with banner ID
      });

      // If API deletion is successful
      if (response?.success) {
        // Dispatch the success action to remove the banner from the store
        yield put(deleteBannerSuccess(payload));

        // Fetch the latest banners after deletion
        yield put(getBanners());

        // Display success alert
        yield Swal.fire({
          title: "Deleted!",
          text: "The banner has been deleted successfully.",
          icon: "success",
        });
      } else {
        // If the response failed, dispatch failure action and show error alert
        yield put(deleteBannerFailure(response.message));

        yield Swal.fire({
          title: "Deletion Failed",
          text: "Failed to delete the banner. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(deleteBannerFailure(error.message));

    // Show an error alert
    yield Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

function* createBannerSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const { payload } = action;

    const response = yield ApiRequest.postRequest({
      url: api_url + banner, // Adjust the API endpoint for banners
      data: payload, // Include the new banner data
    });

    if (response?.success) {
      yield put(createBannerSuccess(response.data)); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "Banner Created",
        text: "The banner has been successfully created.",
      });
    } else {
      yield put(createBannerFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to create banner",
      });
    }
  } catch (error) {
    yield put(createBannerFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

function* updateBannerSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state

    const { id, data } = action.payload; // Destructure id and data from action payload

    // Make the API request to update the banner
    const response = yield ApiRequest.putRequest({
      url: `${api_url}${banner}/${id}`, // Correctly access id from action.payload
      data: data, // Include the updated banner data
    });

    if (response?.success) {
      yield put(updateBannerSuccess(response.data)); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "Banner Updated",
        text: "The banner has been successfully updated.",
      });
    } else {
      yield put(updateBannerFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to update banner",
      });
    }
  } catch (error) {
    yield put(updateBannerFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

export default function* bannerSaga() {
  yield takeLeading(actionTypes.GET_BANNERS, getBannersSaga);
  yield takeLeading(actionTypes.GET_BANNER_BY_ID, getBannerByIdSaga); // Updated to use GET_BANNER_BY_ID
  yield takeLeading(actionTypes.DELETE_BANNER, deleteBannerSaga); // Updated to use DELETE_BANNER
  yield takeLeading(actionTypes.CREATE_BANNER, createBannerSaga); // Updated to use CREATE_BANNER
  yield takeLeading(actionTypes.UPDATE_BANNER, updateBannerSaga); // Updated to use UPDATE_BANNER
}
