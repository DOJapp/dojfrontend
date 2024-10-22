import * as actionTypes from "../actionTypes";

const initialState = {
  products: [], // Changed from categories to products
  product: null, // Changed from selectedCategory to product
  loading: false,
  error: null,
};

const product = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_PRODUCTS: // Set products in the state
      return {
        ...state,
        products: payload, // Update products from the payload
        loading: false,
        error: null,
      };

    case actionTypes.SET_PRODUCT: // Set a single product in the state
      return {
        ...state,
        product: payload, // Update selected product
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_PRODUCT: // Start loading for product creation
      return {
        ...state,
        loading: true,
      };

    case actionTypes.CREATE_PRODUCT_SUCCESS: // Successfully created a product
      return {
        ...state,
        products: [...state.products, payload], // Add new product to the list
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_PRODUCT_FAILURE: // Handle product creation failure
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionTypes.UPDATE_PRODUCT: // Start loading for product update
      return {
        ...state,
        loading: true,
      };

    case actionTypes.UPDATE_PRODUCT_SUCCESS: // Successfully updated a product
      return {
        ...state,
        products: state.products.map(
          (product) => (product.id === payload.id ? payload : product) // Update the product in the list
        ),
        product: payload, // Update the selected product as well
        loading: false,
        error: null,
      };

    case actionTypes.UPDATE_PRODUCT_FAILURE: // Handle product update failure
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionTypes.DELETE_PRODUCT: // Start loading for product deletion
      return {
        ...state,
        loading: true,
      };

    case actionTypes.DELETE_PRODUCT_SUCCESS: // Successfully deleted a product
      return {
        ...state,
        products: state.products.filter(
          // Remove the product from the list
          (product) => product.id !== payload
        ),
        loading: false,
        error: null,
      };

    case actionTypes.DELETE_PRODUCT_FAILURE: // Handle product deletion failure
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default product;
