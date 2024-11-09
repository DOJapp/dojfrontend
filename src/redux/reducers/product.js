import * as actionTypes from "../actionTypes";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  success: false,
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
        success: false,
      };

    case actionTypes.SET_ACTIVE_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
        error: null,
        success: false,
      };

    case actionTypes.SET_PRODUCT:
      return {
        ...state,
        product: payload,
        loading: false,
        error: null,
        success: false,
      };

    case actionTypes.CREATE_PRODUCT:
    case actionTypes.UPDATE_PRODUCT:
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };

    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload],
        loading: false,
        success: true,
        error: null,
      };

    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.map(
          (product) => (product._id === payload._id ? payload : product)
        ),
        product: payload,
        loading: false,
        success: true,
        error: null,
      };

    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((product) => product._id !== payload),
        loading: false,
        success: true,
        error: null,
      };

    case actionTypes.CREATE_PRODUCT_FAILURE:
    case actionTypes.UPDATE_PRODUCT_FAILURE:
    case actionTypes.DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default product;
