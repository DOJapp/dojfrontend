import * as actionTypes from "../actionTypes";
import _ from "lodash"; // Import lodash for deep cloning

const initialState = {
  banners: [],
  selectedBanner: null,
  loading: false,
  error: null,
};

const banner = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_BANNERS:
      return {
        ...state,
        banners: _.cloneDeep(payload), // Deep clone to prevent mutations
        loading: false,
        error: null,
      };
    case actionTypes.SET_BANNER:
      return {
        ...state,
        selectedBanner: _.cloneDeep(payload), // Deep clone to prevent mutations
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_BANNER:
      return {
        ...state,
        loading: true, // Set loading true for creation
      };
    case actionTypes.CREATE_BANNER_SUCCESS:
      return {
        ...state,
        banners: [..._.cloneDeep(state.banners), payload], // Deep clone and add new banner
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.UPDATE_BANNER:
      return {
        ...state,
        loading: true, // Set loading true for update
      };
    case actionTypes.UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        banners: state.banners.map((banner) =>
          banner._id === payload._id ? _.cloneDeep(payload) : banner // Deep clone updated banner
        ),
        selectedBanner: _.cloneDeep(payload), // Update selected banner
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case actionTypes.DELETE_BANNER:
      return {
        ...state,
        loading: true, // Set loading true for deletion
      };
    case actionTypes.DELETE_BANNER_SUCCESS:
      return {
        ...state,
        banners: state.banners.filter(
          (banner) => banner._id !== payload // Remove the deleted banner
        ),
        loading: false,
        error: null,
      };
    case actionTypes.DELETE_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state; // Return the state unchanged by default
  }
};

export default banner;
