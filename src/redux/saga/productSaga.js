import * as actionTypes from "../actionTypes";
import { call, put, takeLeading } from "redux-saga/effects";
import Swal from "sweetalert2";
import { ApiRequest } from "../../utils/apiRequest"; // Ensure ApiRequest is imported
import { api_url, products } from "../../utils/Constants"; // Adjust these imports based on your API structure
import { Colors } from "../../assets/styles";
import {
  setProducts,
  setProduct,
  getProducts,
  createProductSuccess,
  createProductFailure,
  updateProductSuccess,
  updateProductFailure,
  deleteProductSuccess,
  deleteProductFailure,
} from "../Actions/productActions.js"; // Correct product actions import

// Saga to get all products
function* getProductsSaga() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const response = yield call(ApiRequest.getRequest, {
      url: api_url + products,
    });

    if (response?.success) {
      console.log("response", response.data);
      yield put(setProducts(response.data)); // Dispatch the setProducts action
    } else {
      yield put(createProductFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch products",
      });
    }
  } catch (error) {
    yield put(createProductFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

// Saga to get product by ID
function* getProductByIdSaga(action) {
  try {
    const { payload } = action; // Assuming the action contains the product ID

    const response = yield call(ApiRequest.getRequest, {
      url: `${api_url}${products}/${payload}`, // Adjust endpoint with product ID
    });

    if (response?.success) {
      yield put(setProduct(response.data)); // Dispatch the setProduct action
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to fetch the product",
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

// Saga to delete a product
function* deleteProductSaga(actions) {
  try {
    const { payload } = actions;

    // Display the confirmation alert
    const result = yield Swal.fire({
      title: `Are you sure you want to delete this product?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    });

    // If user confirmed the deletion
    if (result.isConfirmed) {
      // Call API to delete the product by ID
      const response = yield call(ApiRequest.deleteRequest, {
        url: `${api_url}${products}/${payload}`, // Ensure correct API URL with product ID
      });

      // If API deletion is successful
      if (response?.success) {
        // Dispatch the success action to remove the product from the store
        yield put(deleteProductSuccess(payload));

        // Fetch the latest products after deletion
        yield put(getProducts());

        // Display success alert
        yield Swal.fire({
          title: "Deleted!",
          text: "The product has been deleted successfully.",
          icon: "success",
        });
      } else {
        // If the response failed, dispatch failure action and show error alert
        yield put(deleteProductFailure(response.message));

        yield Swal.fire({
          title: "Deletion Failed",
          text: "Failed to delete the product. Please try again.",
          icon: "error",
        });
      }
    }
  } catch (error) {
    // Handle unexpected errors
    yield put(deleteProductFailure(error.message));

    // Show an error alert
    yield Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  }
}

// Saga to create a product
function* createProductSaga(actions) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state
    const { payload } = actions;

    const response = yield ApiRequest.postRequest({
      url: `${api_url}${products}`, // Adjust endpoint with product
      data: payload, // Include the new product data
    });

    if (response?.success) {
      yield put(createProductSuccess(response.data)); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "Product Created",
        text: "The product has been successfully created.",
      });
    } else {
      yield put(createProductFailure(response.message)); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to create product",
      });
    }
  } catch (error) {
    yield put(createProductFailure(error.message)); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  }
}

// Saga to update a product
function* updateProductSaga(action) {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true }); // Set loading state

    const { id, data } = action.payload; // Destructure id and data from action payload

    // Make the API request to update the product
    const response = yield ApiRequest.putRequest({
      url: `${api_url}${products}/${id}`,
      data: data, // Include the updated product data
    });

    if (response?.success) {
      yield put({
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: response.data,
      }); // Dispatch success action
      Swal.fire({
        icon: "success",
        title: "Product Updated",
        text: "The product has been successfully updated.",
      });
    } else {
      yield put({
        type: actionTypes.UPDATE_PRODUCT_FAILURE,
        payload: response.message,
      }); // Handle failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.message || "Failed to update product",
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_PRODUCT_FAILURE,
      payload: error.message,
    }); // Handle failure
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.message,
    });
  } finally {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false }); // Set loading state to false
  }
}

// Root saga to watch for product-related actions
export default function* productSaga() {
  yield takeLeading(actionTypes.GET_PRODUCTS, getProductsSaga); // Watch for product fetching
  yield takeLeading(actionTypes.GET_PRODUCT_BY_ID, getProductByIdSaga); // Watch for single product fetch
  yield takeLeading(actionTypes.DELETE_PRODUCT, deleteProductSaga); // Watch for product deletion
  yield takeLeading(actionTypes.CREATE_PRODUCT, createProductSaga); // Watch for product creation
  yield takeLeading(actionTypes.UPDATE_PRODUCT, updateProductSaga); // Watch for product update
}
