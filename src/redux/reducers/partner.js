import * as actionTypes from "../actionTypes";

const initialState = {
  partners: [],
  partner: null,
  loading: false,
  success: false,
  error: null,
};

const partnerReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_PARTNERS:
      return {
        ...state,
        partners: payload,
        loading: false,
        error: null,
        success: false, // Reset success when fetching partners
      };

    case actionTypes.SET_PARTNER:
      return {
        ...state,
        partner: payload,
        loading: false,
        error: null,
        success: false,
      };

    case actionTypes.CREATE_PARTNER:
    case actionTypes.UPDATE_PARTNER:
    case actionTypes.UPDATE_PARTNER_BANK_DETAILS:
    case actionTypes.UPDATE_PARTNER_BASIC_DETAILS:
    case actionTypes.UPDATE_PARTNER_GST_DETAILS:
    case actionTypes.DELETE_PARTNER:
      return {
        ...state,
        loading: true,
        error: null,
        success: false, // Reset success when starting a request
      };

    case actionTypes.CREATE_PARTNER_SUCCESS:
      return {
        ...state,
        partners: [...state.partners, payload],
        loading: false,
        error: null,
        success: true, // Indicate success
      };

    case actionTypes.CREATE_PARTNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };

    case actionTypes.UPDATE_PARTNER_SUCCESS:
      return {
        ...state,
        partners: state.partners.map((partner) =>
          partner._id === payload._id ? payload : partner
        ),
        partner: payload,
        loading: false,
        error: null,
        success: true, // Indicate success
      };
    case actionTypes.UPDATE_PARTNER_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        partners: state.partners.map((partner) =>
          partner._id === payload._id ? payload : partner
        ),
        partner: payload,
        loading: false,
        error: null,
        success: true, // Indicate success
      };
    case actionTypes.UPDATE_PARTNER_GST_DETAILS_SUCCESS:
      return {
        ...state,
        partners: state.partners.map((partner) =>
          partner._id === payload._id ? payload : partner
        ),
        partner: payload,
        loading: false,
        error: null,
        success: true, // Indicate success
      };
    case actionTypes.UPDATE_PARTNER_BASIC_DETAILS_SUCCESS:
      return {
        ...state,
        partners: state.partners.map((partner) =>
          partner._id === payload._id ? payload : partner
        ),
        partner: payload,
        loading: false,
        error: null,
        success: true, // Indicate success
      };

    case actionTypes.UPDATE_PARTNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };

    case actionTypes.UPDATE_PARTNER_BANK_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };
    case actionTypes.UPDATE_PARTNER_GST_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, 
      };

    case actionTypes.UPDATE_PARTNER_BASIC_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false,
      };
    case actionTypes.DELETE_PARTNER_SUCCESS:
      return {
        ...state,
        partners: state.partners.filter(
          (partner) => partner._id !== payload
        ),
        loading: false,
        error: null,
        success: true, // Indicate success
      };

    case actionTypes.DELETE_PARTNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };

    default:
      return state;
  }
};

export default partnerReducer;
