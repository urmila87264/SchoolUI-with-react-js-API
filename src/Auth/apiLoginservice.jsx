import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:5168/api/v2",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to handle API POST requests
export const postData = async (endpoint, data) => {
    try {
        debugger;
        console.log("Posting Data:", JSON.stringify(data, null, 2)); 

        const response = await api.post(endpoint, data);
        return response.data;
    } catch (error) {
       // console.error(`Error posting to ${endpoint}:`, error);

        let errorMessage = "Failed to submit data.";
        if (error.response) {
            errorMessage = error.response.data?.message || errorMessage;
        }

        throw new Error(errorMessage);
    }
};
