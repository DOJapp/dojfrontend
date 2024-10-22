import * as actionTypes from "../actionTypes";

const initialState = {
  customerListData: null,
};

const customer = (state = initialState, actions) => {
  const { payload, type } = actions;

  switch (type) {
    case actionTypes.SET_ALL_CUSTOMER: {
      return {
        ...state,
        customerListData: payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default customer;
