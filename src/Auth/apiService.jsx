import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5168/api",
    timeout:5000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Generic API Fetch Function with Error Handling
export const fetchData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
       // console.error(`Error fetching ${endpoint}:`, error.response?.data || error.message);
        throw new Error(error.response?.data?.message || `Failed to fetch data from ${endpoint}`);
    }
};

// ✅ Generic API Post Function using Axios (Replaces Fetch)
