import * as actionTypes from "../actionTypes";

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const category = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
        error: null,
      };
    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        selectedCategory: payload,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        loading: true, // Set loading true for creation
      };
    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        loading: true, // Set loading true for update
      };
    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload.id ? payload : category
        ),
        selectedCategory: payload, // Update selected category as well
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        loading: true, // Set loading true for deletion
      };
    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload
        ),
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default category;
