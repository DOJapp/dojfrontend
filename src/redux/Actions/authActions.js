import * as actionTypes from "../actionTypes";

export const loginSuccess = (userEmail) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: userEmail,
});

export const loginFailure = (error) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: error,
});

export const loginRequest = (email, password) => ({
  type: actionTypes.LOGIN_REQUEST,
  payload: { email, password }, 
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});
