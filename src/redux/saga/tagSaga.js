import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest"; // Ensure ApiRequest is imported
import { api_url, tags } from "../../utils/Constants"; // Adjust these imports based on your API structure
import { Colors } from "../../assets/styles";
import {
  setTags,
  setTag,
  getTags,
  createTagSuccess,
  createTagFailure,
  updateTagSuccess,
  updateTagFailure,
  deleteTagSuccess,
  deleteTagFailure,
} from "../Actions/tagsActions.js"; // Update import path to the correct action file

function* getTagsSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + tags,
    });

    if (response?.success) {
      yield put(setTags(response.data)); // Dispatch the setTags action
    } else {
      yield put(createTagFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch Tags",
      });
    }
  } catch (error) {
    yield put(createTagFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

function* getTagByIdSaga(action) {
  try {
    const { payload } = action; // Assuming the action contains the Tag ID

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${tags}/${payload}`,
    });

    if (response?.success) {
      yield put(setTag(response.data)); // Dispatch the setTag action
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch the Tag",
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

function* deleteTagSaga(action) {
  try {
    const { payload } = action;

    // Display the confirmation alert
    const result = yield Swal.fire({
      title: `Are you sure you want to delete this Tag?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    // If user confirmed the deletion
    if (result.isConfirmed) {
      // Call API to delete the Tag by ID
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${tags}/${payload}`, // Ensure correct API URL with Tag ID
      });

      // If API deletion is successful
      if (response?.success) {
        // Dispatch the success action to remove the Tag from the store
        yield put(deleteTagSuccess(payload));

        // Fetch the latest Tags after deletion
        yield put(getTags());

        // Display success alert
        yield Swal.fire({
          title: "Deleted!",
          text: "The Tag has been deleted successfully.",
          icon: "success",
        });
      } else {
        // If the response failed, dispatch failure action and show error alert
        yield put(deleteTagFailure(response.message));

        yield Swal.fire({
          title: "Deletion Failed",
          text: "Failed to delete the Tag. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(deleteTagFailure(error.message));

    // Show an error alert
    yield Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

function* createTagSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const { payload } = action;

    // Ensure api_url and tags are defined correctly
    const response = yield call(ApiRequest.postRequest, {
      url: `${api_url}${tags}`, // Adjusted the API endpoint for Tags
      data: payload,
      header: "json", // Include the new Tag data
    });
    console.log("response", response);
    // Check for response success
    if (response?.success) {
      yield put(createTagSuccess(response.data)); // Dispatch success action

      // Show success notification
      Swal.fire({
        icon: "success",
        title: "Tag Created",
        text: "The Tag has been successfully created.",
      });
    } else {
      yield put(createTagFailure(response.message || "Failed to create Tag")); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to create Tag",
      });
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(
      createTagFailure(error.message || "An unexpected error occurred")
    ); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message || "An unexpected error occurred",
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

function* updateTagSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state

    const { id, data } = action.payload; // Destructure id and data from action payload

    // Make the API request to update the Tag
    const response = yield call(ApiRequest.putRequest, {
      url: `${api_url}${tags}/${id}`, // Correctly access id from action.payload
      data: data,
      header: "json", // Include the updated Tag data
    });

    if (response?.success) {
      yield put(updateTagSuccess(response.data)); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "Tag Updated",
        text: "The Tag has been successfully updated.",
      });
    } else {
      yield put(updateTagFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to update Tag",
      });
    }
  } catch (error) {
    yield put(updateTagFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

export default function* TagSaga() {
  yield takeLeading(actionTypes.GET_TAGS, getTagsSaga);
  yield takeLeading(actionTypes.GET_TAG_BY_ID, getTagByIdSaga);
  yield takeLeading(actionTypes.DELETE_TAG, deleteTagSaga);
  yield takeLeading(actionTypes.CREATE_TAG, createTagSaga);
  yield takeLeading(actionTypes.UPDATE_TAG, updateTagSaga);
}
