import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: "http://localhost:5168/api", // Replace with your API URL
    timeout: 10000, // Timeout after 10 seconds
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to handle API POST requests
export const postData = async (endpoint, data) => {
    debugger;
    try {
        debugger;
        console.log("Posting Data:", JSON.stringify(data, null, 2)); // Debugging Log

        // Make the POST request
        const response = await api.post(endpoint, data);

        // Return response data
        return response.data;
    } catch (error) {
        debugger;
        console.log(`Error posting to ${endpoint}:`, error);

        if (error.response) {
            console.log("Response Data:", error.response.data);
            console.log("Response Status:", error.response.status);
            console.log("Response Headers:", error.response.headers);
        } else if (error.request) {
            console.log("Request was made but no response received:", error.request);
        } else {
            console.log("Unknown Error:", error.message);
        }

        throw new Error(error.response?.data?.message || "Failed to submit data.");
    }
};
