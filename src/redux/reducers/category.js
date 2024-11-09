import * as actionTypes from "../actionTypes";

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
  success: false, 
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
        success: false, 
      };

    case actionTypes.SET_CATEGORY:
      return {
        ...state,
        selectedCategory: payload,
        loading: false,
        error: null,
        success: false, // Success in setting the selected category
      };

    case actionTypes.CREATE_CATEGORY:
      return {
        ...state,
        loading: true, // Set loading true for creation
        success: false, // Reset success flag during creation
        error: null, // Reset error
      };

    case actionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload], // Add the new category to the list
        loading: false,
        error: null,
        success: true, // Mark as success
      };

    case actionTypes.CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload, // Capture error in case of failure
        success: false, // Mark as failure
      };

    case actionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        loading: true, // Set loading true for update
        success: false, // Reset success flag during update
        error: null, // Reset error
      };

    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload.id ? payload : category
        ), // Update category in the list
        selectedCategory: payload, // Update selected category as well
        loading: false,
        error: null,
        success: true, // Mark as success
      };

    case actionTypes.UPDATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload, // Capture error in case of failure
        success: false, // Mark as failure
      };

    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        loading: true, // Set loading true for deletion
        success: false, // Reset success flag during deletion
        error: null, // Reset error
      };

    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload // Remove the deleted category from the list
        ),
        loading: false,
        error: null,
        success: true, // Mark as success
      };

    case actionTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload, // Capture error in case of failure
        success: false, // Mark as failure
      };

    default:
      return state;
  }
};

export default category;
