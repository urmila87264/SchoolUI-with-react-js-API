import React, { useState, lazy, Suspense } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postData } from "./apiPostService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Optional: For Bootstrap JS components

// ✅ Lazy Load Dropdown for Performance
const Dropdown = lazy(() => import("./Cousedropdown"));

const Registration = ({ onRegister }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        RoleId: "",
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        motherName: "",
        fatherName: "",
        gender: "",
        dob: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            setLoading(false);
            return;
        }

        const payload = {
            RoleId: Number(formData.RoleId),
            email: formData.email.trim(),
            Password: formData.password.trim(),
            confirmPassword: formData.confirmPassword.trim(),
            name: formData.name.trim(),
            motherName: formData.motherName.trim(),
            fatherName: formData.fatherName.trim(),
            gender: formData.gender,
            DOB: formData.dob.trim(),
        };

        try {
            console.log("Sending Data:", payload);
            const response = await postData("/Auth/SignUp", payload);
            debugger;
            if (response) {
                debugger;  // ✅ Ensure API response exists and is successful
                setSuccess(response.message || "User registered successfully!");
                console.log("Redirecting to login...");
                console.log("Navigating to login...");

                setTimeout(() => {
                    onRegister();
                    navigate("/login");
                }, 1000);
                // ✅ Redirect to login page IMMEDIATELY
                //navigate("/login");
                //window.location.href = "../login";
                // ✅ Reset form data after navigation
                setFormData({
                    RoleId: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    name: "",
                    motherName: "",
                    fatherName: "",
                    gender: "",
                    dob: ""
                });
            } else {
                setError(response.message || "Registration failed.");
            }
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="h-100 bg-dark">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card card-registration my-4">
                            <div className="row g-0">
                                <div className="col-xl-6 d-none d-xl-block">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                                        alt="Sample"
                                        className="img-fluid"
                                        style={{ borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem" }}
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase">Registration Form</h3>
                                        <form onSubmit={handleSaveData}>
                                            <div className="mb-4">
                                                <Suspense fallback={<p>Loading Dropdown...</p>}>
                                                    <Dropdown
                                                        type="role"
                                                        name="RoleId"
                                                        onSelect={(value) => setFormData((prev) => ({ ...prev, RoleId: value }))}
                                                    />
                                                </Suspense>
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="email">Email:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="name">User Name:</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="dob">Date of Birth:</label>
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    className="form-control"
                                                    name="dob"
                                                    value={formData.dob}
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
                                            <div className="mb-4">
                                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <h6>Gender:</h6>
                                                {['female', 'male', 'other'].map((gender) => (
                                                    <div key={gender} className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            id={gender}
                                                            value={gender}
                                                            checked={formData.gender === gender}
                                                            onChange={handleChange}
                                                        />
                                                        <label className="form-check-label" htmlFor={gender}>
                                                            {gender.charAt(0).toUpperCase() + gender.slice(1)}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                                {loading ? "Submitting..." : "Register"}
                                            </button>
                                        </form>
                                        {error && <p className="text-danger mt-2">{error}</p>}
                                        {success && <p className="text-success mt-2">{success}</p>}
                                        <p className="text-center text-muted mt-5 mb-0">
                                            Have an account?
                                            <button
                                                className="fw-bold text-body border-0 bg-transparent"
                                                onClick={() => navigate("/login")}
                                            >
                                                <u>Login here</u>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;
