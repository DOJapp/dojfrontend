import * as actionTypes from "../actionTypes";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const product = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
        error: null,
      };

    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_PRODUCT:
    case actionTypes.UPDATE_PRODUCT:
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
        error: null, // Clear error on new request
      };

    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload], // Add new product to the list
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_PRODUCT_FAILURE:
    case actionTypes.UPDATE_PRODUCT_FAILURE:
    case actionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(
          (product) => (product._id === payload.id ? payload : product) // Update the product in the list
        ),
        product: payload, // Update the selected product as well
        loading: false,
        error: null,
      };

    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== payload // Remove the product from the list
        ),
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default product;
