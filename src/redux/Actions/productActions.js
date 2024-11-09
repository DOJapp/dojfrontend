import * as actionTypes from "../actionTypes";

// Action to get all products
export const getProducts = () => ({
  type: actionTypes.GET_PRODUCTS,
});
// Action to get all products


// Action to set products in the state
export const setProducts = (payload) => ({
  type: actionTypes.SET_PRODUCTS,
  payload,
});

export const getActiveProducts = () => ({
  type: actionTypes.GET_ACTIVE_PRODUCTS,
});

export const setActiveProducts = (payload) => ({
  type: actionTypes.SET_ACTIVE_PRODUCTS,
  payload,
});
// Action to get a specific product by its ID
export const getProductById = (payload) => ({
  type: actionTypes.GET_PRODUCT_BY_ID,
  payload, // ID of the product to fetch
});

// Action to set a specific product
export const setProduct = (payload) => ({
  type: actionTypes.SET_PRODUCT,
  payload,
});

// Action to create a new product
export const createProduct = (payload) => ({
  type: actionTypes.CREATE_PRODUCT,
  payload,
});

// Action to indicate successful product creation
export const createProductSuccess = (payload) => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
  payload,
});

// Action to indicate failed product creation
export const createProductFailure = (payload) => ({
  type: actionTypes.CREATE_PRODUCT_FAILURE,
  payload,
});

// Action to update an existing product
export const updateProduct = (id, productData) => ({
  type: actionTypes.UPDATE_PRODUCT,
  payload: {
    id, // Include the ID in the payload
    data: productData, // Include the product data in the payload
  },
});

// Action to indicate successful product update
export const updateProductSuccess = (payload) => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  payload,
});

// Action to indicate failed product update
export const updateProductFailure = (payload) => ({
  type: actionTypes.UPDATE_PRODUCT_FAILURE,
  payload,
});

// Action to delete a product
export const deleteProduct = (payload) => ({
  type: actionTypes.DELETE_PRODUCT,
  payload, // Product ID
});

// Action to indicate successful product deletion
export const deleteProductSuccess = (payload) => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
  payload,
});

// Action to indicate failed product deletion
export const deleteProductFailure = (payload) => ({
  type: actionTypes.DELETE_PRODUCT_FAILURE,
  payload,
});
