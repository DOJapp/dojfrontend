import * as actionTypes from "../actionTypes";

// Action to get all categories
export const getCategories = () => ({
  type: actionTypes.GET_CATEGORIES,
});

// Action to set categories in the state
export const setCategories = (payload) => ({
  type: actionTypes.SET_CATEGORIES,
  payload,
});

export const getCategoryById = (payload) => ({
  type: actionTypes.GET_CATEGORY_BY_ID,
  payload, // ID of the category to fetch
});

// Action to set a specific category
export const setCategory = (payload) => ({
  type: actionTypes.SET_CATEGORY,
  payload,
});

// Action to create a new category
export const createCategory = (payload) => ({
  type: actionTypes.CREATE_CATEGORY,
  payload,
});

// Action to indicate successful category creation
export const createCategorySuccess = (payload) => ({
  type: actionTypes.CREATE_CATEGORY_SUCCESS,
  payload,
});

// Action to indicate failed category creation
export const createCategoryFailure = (payload) => ({
  type: actionTypes.CREATE_CATEGORY_FAILURE,
  payload,
});

// Action to update an existing category
export const updateCategory = (id, categoryData) => ({
  type: actionTypes.UPDATE_CATEGORY,
  payload: {
    id, // Include the ID in the payload
    data: categoryData, // Include the category data in the payload
  },
});

// Action to indicate successful category update
export const updateCategorySuccess = (payload) => ({
  type: actionTypes.UPDATE_CATEGORY_SUCCESS,
  payload,
});

// Action to indicate failed category update
export const updateCategoryFailure = (payload) => ({
  type: actionTypes.UPDATE_CATEGORY_FAILURE,
  payload,
});

// Action to delete a category
export const deleteCategory = (payload) => ({
  type: actionTypes.DELETE_CATEGORY,
  payload, // Category ID
});

// Action to indicate successful category deletion
export const deleteCategorySuccess = (payload) => ({
  type: actionTypes.DELETE_CATEGORY_SUCCESS,
  payload,
});

// Action to indicate failed category deletion
export const deleteCategoryFailure = (payload) => ({
  type: actionTypes.DELETE_CATEGORY_FAILURE,
  payload,
});
