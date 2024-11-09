import * as actionTypes from "../actionTypes";
import _ from "lodash"; // Import lodash for deep cloning

const initialState = {
  banners: [],
  selectedBanner: null,
  loading: false,
  error: null,
  success: false,
};

const banner = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_BANNERS:
      return {
        ...state,
        banners: _.cloneDeep(payload),
        loading: false,
        success: false,
        error: null,
      };
      
    case actionTypes.SET_BANNER:
      return {
        ...state,
        selectedBanner: _.cloneDeep(payload),
        loading: false,
        success: false,
        error: null,
      };
      
    case actionTypes.CREATE_BANNER:
      return {
        ...state,
        loading: true,
        success: false,
      };
      
    case actionTypes.CREATE_BANNER_SUCCESS:
      return {
        ...state,
        banners: [..._.cloneDeep(state.banners), payload],
        loading: false,
        success: true,
        error: null,
      };
      
    case actionTypes.CREATE_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false, // Reset success on failure
        error: payload,
      };
      
    case actionTypes.UPDATE_BANNER:
      return {
        ...state,
        loading: true,
        success: false,
      };
      
    case actionTypes.UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        banners: state.banners.map((banner) =>
          banner._id === payload._id ? _.cloneDeep(payload) : banner
        ),
        selectedBanner: _.cloneDeep(payload),
        loading: false,
        success: true,
        error: null,
      };
      
    case actionTypes.UPDATE_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false, // Reset success on failure
        error: payload,
      };
      
    case actionTypes.DELETE_BANNER:
      return {
        ...state,
        loading: true,
        success: false,
      };
      
    case actionTypes.DELETE_BANNER_SUCCESS:
      return {
        ...state,
        banners: state.banners.filter(
          (banner) => banner._id !== payload
        ),
        loading: false,
        success: true,
        error: null,
      };
      
    case actionTypes.DELETE_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        success: false, // Reset success on failure
        error: payload,
      };
      
    default:
      return state;
  }
};

export default banner;
