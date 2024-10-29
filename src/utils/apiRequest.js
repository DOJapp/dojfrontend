import axios from "axios";

// Helper function to retrieve access token
const getAccessToken = () => {
  return localStorage.getItem("accessToken"); // Adjust based on where you're storing the token
};

class _ApiRequest {
  // Define the content types for headers
  post_header = "multipart/form-data";
  get_header = "application/json";

  // Method to make POST requests
  postRequest = async ({ url = null, data = null, header = "form" }) => {

    try {
      const token = getAccessToken(); // Get access token
      const response = await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
          Authorization: `Bearer ${token}`, // Attach token to the header
        },
        data: data,
      });

      return response.data; // Return the response data directly
    } catch (e) {
      const errorHtml = e.response?.data || '';
      const errorMessageMatch = errorHtml.match(/Error: (.*?)(?:<|$)/); // Match "Error: ..." until the next tag or end
  
      const errorMessage = errorMessageMatch ? errorMessageMatch[1].trim() : "An error occurred";
  
      console.error("Error in postRequest:", errorMessage); // Improved error logging
      return { success: false, message: errorMessage }; // Return a structured error response
    }
  };

  // Method to make GET requests
  getRequest = async ({ url = null }) => {
    try {
      const token = getAccessToken(); // Get access token
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          "Content-Type": this.get_header,
          Authorization: `Bearer ${token}`, // Attach token to the header
        },
      });

      return response.data; // Return the response data directly
    } catch (e) {
      
      console.error("Error in getRequest:", e); // Improved error logging
      return { success: false, message: e.message }; // Return a structured error response
    }
  };

  // Method to make PUT requests
  putRequest = async ({ url = null, data = null, header = "form" }) => {

    try {
      const token = getAccessToken(); // Get access token
      const response = await axios({
        method: "put",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
          Authorization: `Bearer ${token}`, // Attach token to the header
        },
        data: data,
      });

      return response.data; // Return the response data directly
    } catch (e) {
      console.error("Error in putRequest:", e); // Improved error logging
      return { success: false, message: e.message }; // Return a structured error response
    }
  };

  // Method to make PATCH requests
  patchRequest = async ({ url = null, data = null, header = "form" }) => {
    try {
      const token = getAccessToken(); // Get access token
      const response = await axios({
        method: "patch",
        url: url,
        headers: {
          "Content-Type":
            header === "form" ? this.post_header : this.get_header,
          Authorization: `Bearer ${token}`, // Attach token to the header
        },
        data: data,
      });

      return response.data; // Return the response data directly
    } catch (e) {
      console.error("Error in patchRequest:", e); // Improved error logging
      return { success: false, message: e.message }; // Return a structured error response
    }
  };

  // Method to make DELETE requests
  deleteRequest = async ({ url = null, header = "application/json" }) => {
    try {
      const token = getAccessToken(); // Get access token
      const response = await axios({
        method: "delete",
        url: url,
        headers: {
          "Content-Type": header,
          Authorization: `Bearer ${token}`, // Attach token to the header
        },
      });

      return response.data; // Return the response data directly
    } catch (e) {
      console.error("Error in deleteRequest:", e); // Improved error logging
      return { success: false, message: e.message }; // Return a structured error response
    }
  };
}

export const ApiRequest = new _ApiRequest();
