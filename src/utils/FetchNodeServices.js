import axios from "axios";
import { base_url } from "./Constants";

// Function to post data
const postData = async (url, body, isFile = false) => {
  try {

    const headers = {
      "Content-Type": isFile ? "multipart/form-data" : "application/json",
    };
    
    const response = await axios.post(`${base_url}${url}`, body, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in postData:", error);
    return false; // Return false or you can throw the error for handling it elsewhere
  }
};

// Function to get data
const getData = async (url) => {
  try {
    const response = await axios.get(`${base_url}${url}`);
    return response.data;
  } catch (error) {
    console.error("Error in getData:", error);
    return false;
  }
};

// Function to put data
const putData = async (url, body, isFile = false) => {
  try {
    const headers = {
      "Content-Type": isFile ? "multipart/form-data" : "application/json",
    };
    const response = await axios.put(`${base_url}${url}`, body, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in putData:", error);
    return false;
  }
};

// Function to delete data
const deleteData = async (url, body = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.delete(`${base_url}${url}`, {
      data: body, // Send the body with the delete request
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteData:", error);
    return false;
  }
};

export { postData, getData, putData, deleteData };
