import * as actionTypes from "../actionTypes";

const initialState = {
  isLoading: false,       // Loading state
  isSidebarOpen: true,    // Sidebar open state
  dashboardData: null,    // Data for the dashboard
};

const dashboard = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case actionTypes.SET_IS_LOADING: {
      return { ...state, isLoading: payload }; // Update loading state
    }

    case actionTypes.SET_IS_SIDEBAR_OPEN: {
      return { ...state, isSidebarOpen: payload }; // Update sidebar open state
    }

    case actionTypes.SET_DASHBOARD: {
      return { ...state, dashboardData: payload }; // Update dashboard data
    }

    default: {
      return state; // Return current state if no action matches
    }
  }
};

export default dashboard;
