import * as actionTypes from "../actionTypes";

export const setIsLoading = (payload) => ({
  type: actionTypes.SET_IS_LOADING,
  payload,
});

export const setIsSidebarOpen = (payload) => ({ // Corrected typo here
  type: actionTypes.SET_IS_SIDEBAR_OPEN,
  payload,
});

export const setDashboard = (payload) => ({
  type: actionTypes.SET_DASHBOARD,
  payload,
});

export const getDashboard = (payload) => ({
  type: actionTypes.GET_DASHBOARD,
  payload,
});
