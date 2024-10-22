import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest"; // Ensure ApiRequest is imported
import { api_url, category } from "../../utils/Constants"; // Adjust these imports based on your API structure
import { Colors } from "../../assets/styles";
import {
  setCategories,
  setCategory,
  getCategories,
  createCategorySuccess,
  createCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from "../Actions/categoryActions.js";

function* getCategoriesSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + category, // Adjust the API endpoint as needed
    });

    if (response?.success) {
      console.log("response", response);
      yield put(setCategories(response.data)); // Dispatch the setCategories action
    } else {
      yield put(createCategoryFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch categories",
      });
    }
  } catch (error) {
    yield put(createCategoryFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

function* getCategoryByIdSaga(action) {
  try {
    const { payload } = action; // Assuming the action contains the category ID
    
    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${category}/${payload}`, 
    });

    if (response?.success) {
      yield put(setCategory(response.data)); // Dispatch the setCategory action
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch the category",
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

function* deleteCategorySaga(actions) {
  try {
    const { payload } = actions;

    // Display the confirmation alert
    const result = yield Swal.fire({
      title: `Are you sure you want to delete this category?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    // If user confirmed the deletion
    if (result.isConfirmed) {
      // Call API to delete the category by ID
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${category}/${payload._id}`, // Ensure correct API URL with category ID
      });

      // If API deletion is successful
      if (response?.success) {
        // Dispatch the success action to remove the category from the store
        yield put(deleteCategorySuccess(payload._id));

        // Fetch the latest categories after deletion
        yield put(getCategories());

        // Display success alert
        yield Swal.fire({
          title: "Deleted!",
          text: "The category has been deleted successfully.",
          icon: "success",
        });
      } else {
        // If the response failed, dispatch failure action and show error alert
        yield put(deleteCategoryFailure(response.message));

        yield Swal.fire({
          title: "Deletion Failed",
          text: "Failed to delete the category. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(deleteCategoryFailure(error.message));

    // Show an error alert
    yield Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

function* createCategorySaga(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const { payload } = actions;

    const response = yield ApiRequest.postRequest({
      url: api_url + category, // Adjust the API endpoint as needed
      data: payload, // Include the new category data
    });

    if (response?.success) {
      yield put(createCategorySuccess(response.data)); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "Category Created",
        text: "The category has been successfully created.",
      });
    } else {
      yield put(createCategoryFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to create category",
      });
    }
  } catch (error) {
    yield put(createCategoryFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}


function* updateCategorySaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state

    const { id, data } = action.payload; // Destructure id and data from action payload

    // Make the API request to update the category
    const response = yield ApiRequest.putRequest({
      url: `${api_url}admin/category/${id}`, // Correctly access id from action.payload
      data: data, // Include the updated category data
    });

    if (response?.success) {
      yield put({ type: actionTypes.UPDATE_CATEGORY_SUCCESS, payload: response.data }); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "Category Updated",
        text: "The category has been successfully updated.",
      });
    } else {
      yield put({ type: actionTypes.UPDATE_CATEGORY_FAILURE, payload: response.message }); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to update category",
      });
    }
  } catch (error) {
    yield put({ type: actionTypes.UPDATE_CATEGORY_FAILURE, payload: error.message }); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}


export default function* categorySaga() {
  yield takeLeading(actionTypes.GET_CATEGORIES, getCategoriesSaga);
  yield takeLeading(actionTypes.GET_CATEGORY_BY_ID, getCategoryByIdSaga); // Updated to use GET_CATEGORY
  yield takeLeading(actionTypes.DELETE_CATEGORY, deleteCategorySaga);
  yield takeLeading(actionTypes.CREATE_CATEGORY, createCategorySaga);
  yield takeLeading(actionTypes.UPDATE_CATEGORY, updateCategorySaga);
}
