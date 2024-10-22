import * as actionTypes from "../actionTypes";

const initialState = {
  userEmail: null,
  isAuthenticated: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        userEmail: payload,
        isAuthenticated: true,
        error: null,
      };
    }

    case actionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        error: payload,
      };
    }

    case actionTypes.LOGOUT: {
      return {
        ...initialState, // Reset state to initial
      };
    }

    case actionTypes.CLEAR_ERRORS: {
      return {
        ...state,
        error: null, // Clear errors
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
