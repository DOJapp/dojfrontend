import * as actionTypes from "../actionTypes";
import _ from "lodash";

const initialState = {
  tags: [],
  selectedTag: null,
  loading: false,
  error: null,
  success: false,
};

const tagReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_TAGS:
      return {
        ...state,
        tags: _.cloneDeep(payload),
        loading: false,
        error: null,
        success: false,
      };
    case actionTypes.SET_TAG:
      return {
        ...state,
        selectedTag: _.cloneDeep(payload),
        loading: false,
        error: null,
        success: false,
      };
    case actionTypes.CREATE_TAG:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actionTypes.CREATE_TAG_SUCCESS:
      return {
        ...state,
        tags: [...state.tags, _.cloneDeep(payload)],
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.CREATE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case actionTypes.UPDATE_TAG:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actionTypes.UPDATE_TAG_SUCCESS:
      return {
        ...state,
        tags: state.tags.map(
          (tag) => (tag._id === payload._id ? _.cloneDeep(payload) : tag)
        ),
        selectedTag: _.cloneDeep(payload),
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.UPDATE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case actionTypes.DELETE_TAG:
      return {
        ...state,
        loading: true,
        success: false,
        error: null,
      };
    case actionTypes.DELETE_TAG_SUCCESS:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag._id !== payload),
        loading: false,
        error: null,
        success: true,
      };
    case actionTypes.DELETE_TAG_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    default:
      return state;
  }
};

export default tagReducer;
