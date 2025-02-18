import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import

// Helper to check if the token is expired
const isTokenExpired = (token) => {
  if (!token) return true; // If token is missing, treat it as expired
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // ✅ Convert `exp` to milliseconds
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Treat invalid token as expired
  }
};

const PrivateRoute = ({ element }) => {
    debugger;
  const token = localStorage.getItem("token"); // ✅ Use correct key
  console.log("Decoded Token:", token ? jwtDecode(token) : "No token found");

  // If token is missing or expired, redirect to login page
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />; // ✅ `replace` avoids back navigation
  }

  return element; // ✅ Render protected page if token is valid
};

export default PrivateRoute;
