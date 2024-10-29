import * as actionTypes from "../actionTypes";

// Action to get all Tags
export const getTags = () => ({
  type: actionTypes.GET_TAGS, // Corrected action type to uppercase
});

// Action to set Tags in the state
export const setTags = (payload) => ({
  type: actionTypes.SET_TAGS, // Corrected action type to uppercase
  payload,
});

// Action to get a specific Tag by ID
export const getTagById = (payload) => ({
  type: actionTypes.GET_TAG_BY_ID, // Corrected action type to uppercase
  payload, // ID of the Tag to fetch
});

// Action to set a specific Tag
export const setTag = (payload) => ({
  type: actionTypes.SET_TAG, // Corrected action type to uppercase
  payload,
});

// Action to create a new Tag
export const createTag = (payload) => ({
  type: actionTypes.CREATE_TAG, // Corrected action type to uppercase
  payload,
});

// Action to indicate successful Tag creation
export const createTagSuccess = (payload) => ({
  type: actionTypes.CREATE_TAG_SUCCESS, // Corrected action type to uppercase
  payload,
});

// Action to indicate failed Tag creation
export const createTagFailure = (payload) => ({
  type: actionTypes.CREATE_TAG_FAILURE, // Corrected action type to uppercase
  payload,
});

// Action to update an existing Tag
export const updateTag = (id, tagData) => ({
  type: actionTypes.UPDATE_TAG, // Corrected action type to uppercase
  payload: {
    id, // Include the ID in the payload
    data: tagData, // Include the Tag data in the payload
  },
});

// Action to indicate successful Tag update
export const updateTagSuccess = (payload) => ({
  type: actionTypes.UPDATE_TAG_SUCCESS, // Corrected action type to uppercase
  payload,
});

// Action to indicate failed Tag update
export const updateTagFailure = (payload) => ({
  type: actionTypes.UPDATE_TAG_FAILURE, // Corrected action type to uppercase
  payload,
});

// Action to delete a Tag
export const deleteTag = (payload) => ({
  type: actionTypes.DELETE_TAG, // Corrected action type to uppercase
  payload, // Tag ID
});

// Action to indicate successful Tag deletion
export const deleteTagSuccess = (payload) => ({
  type: actionTypes.DELETE_TAG_SUCCESS, // Corrected action type to uppercase
  payload,
});

// Action to indicate failed Tag deletion
export const deleteTagFailure = (payload) => ({
  type: actionTypes.DELETE_TAG_FAILURE, // Corrected action type to uppercase
  payload,
});
