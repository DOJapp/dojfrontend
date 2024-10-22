// Common or dashboard
export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_IS_SIDEBAR_OPEN = "SET_IS_SIDEBAR_OPEN";

export const LOGIN_REQUEST = "LOGIN_REQUEST"; // Add this line
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

//Customer
export const GET_ALL_CUSTOMER = "GET_ALL_CUSTOMER";
export const SET_ALL_CUSTOMER = "SET_ALL_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const BAN_CUSTOMER = "BAN_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";

// actionTypes.js

// Category actions
export const GET_CATEGORIES = "GET_CATEGORIES"; // Fetch all categories
export const SET_CATEGORIES = "SET_CATEGORIES"; // Store fetched categories
export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID"; // Fetch a specific category
export const SET_CATEGORY = "SET_CATEGORY"; // Store a specific category
export const CREATE_CATEGORY = "CREATE_CATEGORY"; // Create a new category
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS"; // Successful category creation
export const CREATE_CATEGORY_FAILURE = "CREATE_CATEGORY_FAILURE"; // Failed category creation
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"; // Update an existing category
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS"; // Successful category update
export const UPDATE_CATEGORY_FAILURE = "UPDATE_CATEGORY_FAILURE"; // Failed category update
export const DELETE_CATEGORY = "DELETE_CATEGORY"; // Delete a category
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS"; // Successful category deletion
export const DELETE_CATEGORY_FAILURE = "DELETE_CATEGORY_FAILURE"; // Failed category deletion

//Banners
export const GET_BANNERS = 'GET_BANNERS';
export const SET_BANNERS = 'SET_BANNERS';
export const GET_BANNER_BY_ID = 'GET_BANNER_BY_ID';
export const SET_BANNER = 'SET_BANNER';
export const CREATE_BANNER = 'CREATE_BANNER';
export const CREATE_BANNER_SUCCESS = 'CREATE_BANNER_SUCCESS';
export const CREATE_BANNER_FAILURE = 'CREATE_BANNER_FAILURE';
export const UPDATE_BANNER = 'UPDATE_BANNER';
export const UPDATE_BANNER_SUCCESS = 'UPDATE_BANNER_SUCCESS';
export const UPDATE_BANNER_FAILURE = 'UPDATE_BANNER_FAILURE';
export const DELETE_BANNER = 'DELETE_BANNER';
export const DELETE_BANNER_SUCCESS = 'DELETE_BANNER_SUCCESS';
export const DELETE_BANNER_FAILURE = 'DELETE_BANNER_FAILURE';


//Dashboard
export const GET_DASHBOARD = "GET_DASHBOARD";
export const SET_DASHBOARD = "SET_DASHBOARD";
