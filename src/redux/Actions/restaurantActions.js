import * as actionTypes from "../actionTypes";

// Action to get all Restaurants
export const getRestaurants = () => ({
  type: actionTypes.GET_RESTAURANTS,
});

// Action to set Restaurants in the state
export const setRestaurants = (payload) => ({
  type: actionTypes.SET_RESTAURANTS,
  payload,
});

// Action to get a specific Restaurant by its ID
export const getRestaurantById = (payload) => ({
  type: actionTypes.GET_RESTAURANT_BY_ID,
  payload, // ID of the Restaurant to fetch
});

// Action to set a specific Restaurant
export const setRestaurant = (payload) => ({
  type: actionTypes.SET_RESTAURANT,
  payload,
});

// Action to create a new Restaurant
export const createRestaurant = (payload) => ({
  type: actionTypes.CREATE_RESTAURANT,
  payload,
});

// Action to indicate successful Restaurant creation
export const createRestaurantSuccess = (payload) => ({
  type: actionTypes.CREATE_RESTAURANT_SUCCESS,
  payload,
});

// Action to indicate failed Restaurant creation
export const createRestaurantFailure = (payload) => ({
  type: actionTypes.CREATE_RESTAURANT_FAILURE,
  payload,
});

// Action to update an existing Restaurant
export const updateRestaurant = (id, restaurantData) => ({
  type: actionTypes.UPDATE_RESTAURANT,
  payload: {
    id, // Include the ID in the payload
    data: restaurantData, // Include the Restaurant data in the payload
  },
});

// Action to indicate successful Restaurant update
export const updateRestaurantSuccess = (payload) => ({
  type: actionTypes.UPDATE_RESTAURANT_SUCCESS,
  payload,
});

// Action to indicate failed Restaurant update
export const updateRestaurantFailure = (payload) => ({
  type: actionTypes.UPDATE_RESTAURANT_FAILURE,
  payload,
});

// Action to delete a Restaurant
export const deleteRestaurant = (payload) => ({
  type: actionTypes.DELETE_RESTAURANT,
  payload, // Restaurant ID
});

// Action to indicate successful Restaurant deletion
export const deleteRestaurantSuccess = (payload) => ({
  type: actionTypes.DELETE_RESTAURANT_SUCCESS,
  payload,
});

// Action to indicate failed Restaurant deletion
export const deleteRestaurantFailure = (payload) => ({
  type: actionTypes.DELETE_RESTAURANT_FAILURE,
  payload,
});
