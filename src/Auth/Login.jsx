import React, { useState,lazy,Suspense  } from "react";
// API function to handle login
import { useNavigate, Link } from "react-router-dom";
import { postData } from "./apiLoginservice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
const Dropdown = lazy(() => import("./Cousedropdown"));
const Login = () => {
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        RoleId:""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = {
            Email: formData.email.trim(),
            Password: formData.password.trim(),
            RoleId:formData.RoleId

        }
        try {
            debugger;
            console.log("Sending Login Data:", payload)
            const response = await postData("/Authentication/Login", payload);
            debugger;
            if (response) {
                debugger;
                console.log("Login Successful!");
               
                localStorage.setItem("token", response.token); // ✅ Store token
                setSuccess(response.message || "Login Successful!");
                navigate("/dashboard"); // ✅ Redirect to dashboard or home
            } else {
                setError(response.message || "Invalid email or password.");
            }
        } catch (err) {
            setError(err.message || "Something went wrong.");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className="vh-100 ">
            <div className="container  h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-md-12">
                        <div className="card-body p-5">
                            <div className="card-body p-5 text-black">
                                <h3 className="mb-4 text-center text-uppercase">Login</h3>
                                <form onSubmit={handleLogin}>
                                    <div className="mb-4">
                                        <Suspense fallback={<p>Loading Dropdown...</p>}>
                                            <Dropdown
                                                type="role"
                                                name="RoleId"
                                                onSelect={(value) => setFormData((prev) => ({ ...prev, RoleId: value }))}
                                            />
                                        </Suspense>
                                    </div>

                                    <div className=" mb-4">
                                        <label htmlFor="email">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="email"
                                            name="email"  // ✅ Ensure "name" matches state keys
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? "Logging in..." : "Login"}
                                    </button>
                                </form>
                                {error && <p className="text-danger mt-2">{error}</p>}
                                {success && <p className="text-success mt-2">{success}</p>}
                               
                                <p className="text-center text-muted mt-5 mb-0">
                                    Don't have an account?{" "}
                                    <button
                                        className="fw-bold text-body border-0 bg-transparent"
                                        onClick={() => navigate("/register")}
                                    >
                                        <u>Register here</u>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
