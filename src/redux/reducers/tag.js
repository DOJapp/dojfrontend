import * as actionTypes from "../actionTypes";
import _ from "lodash"; // Import lodash for deep cloning

const initialState = {
  tags: [], // Array of tags
  selectedTag: null, // The currently selected tag
  loading: false, // Loading state indicator
  error: null,
  success: false, // Success state
};

const tagReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_TAGS:
      return {
        ...state,
        tags: _.cloneDeep(payload), 
        loading: false,
        success: false,
        error: null,
      };
    case actionTypes.SET_TAG:
      return {
        ...state,
        selectedTag: _.cloneDeep(payload),
        loading: false,
        success: false, 
        error: null,
      };
    case actionTypes.CREATE_TAG: 
      return {
        ...state,
        loading: true, 
        success: false, 
      };
    case actionTypes.CREATE_TAG_SUCCESS: // Action for successful tag creation
      return {
        ...state,
        tags: [..._.cloneDeep(state.tags), payload], // Deep clone and add new tag
        loading: false,
        error: null,
        success: true, // Indicate success
      };
    case actionTypes.CREATE_TAG_FAILURE: // Action for failed tag creation
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };
    case actionTypes.UPDATE_TAG: // Action to initiate tag update
      return {
        ...state,
        loading: true, // Set loading true for update
        success: false, // Reset success
      };
    case actionTypes.UPDATE_TAG_SUCCESS: // Action for successful tag update
      return {
        ...state,
        tags: state.tags.map(
          (tag) => (tag._id === payload._id ? _.cloneDeep(payload) : tag) // Deep clone updated tag
        ),
        selectedTag: _.cloneDeep(payload), // Update selected tag
        loading: false,
        error: null,
        success: true, // Indicate success
      };
    case actionTypes.UPDATE_TAG_FAILURE: // Action for failed tag update
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };
    case actionTypes.DELETE_TAG: // Action to initiate tag deletion
      return {
        ...state,
        loading: true, // Set loading true for deletion
        success: false, // Reset success
      };
    case actionTypes.DELETE_TAG_SUCCESS: // Action for successful tag deletion
      return {
        ...state,
        tags: state.tags.filter(
          (tag) => tag._id !== payload // Remove the deleted tag
        ),
        loading: false,
        error: null,
        success: true, // Indicate success
      };
    case actionTypes.DELETE_TAG_FAILURE: // Action for failed tag deletion
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };
    default:
      return state; // Return the state unchanged by default
  }
};

export default tagReducer;
