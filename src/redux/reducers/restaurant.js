import * as actionTypes from "../actionTypes";

const initialState = {
  restaurants: [],
  restaurant: null,
  loading: false,
  success: false, // To track success state
  error: null,
};

const restaurantReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_RESTAURANTS:
      return {
        ...state,
        restaurants: payload,
        loading: false,
        error: null,
        success: false, // Reset success when fetching restaurants
      };

    case actionTypes.SET_RESTAURANT:
      return {
        ...state,
        restaurant: payload,
        loading: false,
        error: null,
        success: false, // Reset success when fetching a restaurant
      };

    case actionTypes.CREATE_RESTAURANT:
    case actionTypes.UPDATE_RESTAURANT:
    case actionTypes.DELETE_RESTAURANT:
      return {
        ...state,
        loading: true,
        error: null,
        success: false, // Reset success when starting a request
      };

    case actionTypes.CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: [...state.restaurants, payload],
        loading: false,
        error: null,
        success: true, // Indicate success
      };

    case actionTypes.CREATE_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };

    case actionTypes.UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant._id === payload._id ? payload : restaurant
        ),
        restaurant: payload,
        loading: false,
        error: null,
        success: true, // Indicate success
      };

    case actionTypes.UPDATE_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        success: false, // Reset success on failure
      };

    case actionTypes.DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant._id !== payload
        ),
        loading: false,
        error: null,
        success: true, // Indicate success
      };

    case actionTypes.DELETE_RESTAURANT_FAILURE:
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

export default restaurantReducer;
