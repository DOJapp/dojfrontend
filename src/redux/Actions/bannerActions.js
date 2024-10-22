import * as actionTypes from "../actionTypes";

// Action to get all banners
export const getBanners = () => ({
  type: actionTypes.GET_BANNERS, // Adjusted action type
});

// Action to set banners in the state
export const setBanners = (payload) => ({
  type: actionTypes.SET_BANNERS, // Adjusted action type
  payload,
});

// Action to get a specific banner by ID
export const getBannerById = (payload) => ({
  type: actionTypes.GET_BANNER_BY_ID, // Adjusted action type
  payload, // ID of the banner to fetch
});

// Action to set a specific banner
export const setBanner = (payload) => ({
  type: actionTypes.SET_BANNER, // Adjusted action type
  payload,
});

// Action to create a new banner
export const createBanner = (payload) => ({
  type: actionTypes.CREATE_BANNER, // Adjusted action type
  payload,
});

// Action to indicate successful banner creation
export const createBannerSuccess = (payload) => ({
  type: actionTypes.CREATE_BANNER_SUCCESS, // Adjusted action type
  payload,
});

// Action to indicate failed banner creation
export const createBannerFailure = (payload) => ({
  type: actionTypes.CREATE_BANNER_FAILURE, // Adjusted action type
  payload,
});

// Action to update an existing banner
export const updateBanner = (id, bannerData) => ({
  type: actionTypes.UPDATE_BANNER, // Adjusted action type
  payload: {
    id, // Include the ID in the payload
    data: bannerData, // Include the banner data in the payload
  },
});

// Action to indicate successful banner update
export const updateBannerSuccess = (payload) => ({
  type: actionTypes.UPDATE_BANNER_SUCCESS, // Adjusted action type
  payload,
});

// Action to indicate failed banner update
export const updateBannerFailure = (payload) => ({
  type: actionTypes.UPDATE_BANNER_FAILURE, // Adjusted action type
  payload,
});

// Action to delete a banner
export const deleteBanner = (payload) => ({
  type: actionTypes.DELETE_BANNER, // Adjusted action type
  payload, // Banner ID
});

// Action to indicate successful banner deletion
export const deleteBannerSuccess = (payload) => ({
  type: actionTypes.DELETE_BANNER_SUCCESS, // Adjusted action type
  payload,
});

// Action to indicate failed banner deletion
export const deleteBannerFailure = (payload) => ({
  type: actionTypes.DELETE_BANNER_FAILURE, // Adjusted action type
  payload,
});
