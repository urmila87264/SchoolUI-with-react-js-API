import React, { useState, lazy, Suspense } from "react";
import { postData } from "./apiPostService";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Optional: For Bootstrap JS components

// ✅ Lazy Load Dropdown for Performance
const Dropdown = lazy(() => import("./Cousedropdown"));

const Registration = () => {
    const [formData, setFormData] = useState({
        RoleId: "",
        email: "",
        name: "",
        password: "",
        motherName: "",
        fatherName: "",
        gender:""

    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveData = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        const payload = {
            RoleId: Number(formData.RoleId), // Ensure roleID is a number
            email: formData.email.trim(), // Trim email for safety
            Password: formData.password.trim(),
            name: formData.name.trim(),
            motherName: formData.motherName.trim(),
            fatherName: formData.fatherName.trim(),
            gender:formData.gender
        };


        try {
            console.log("Sending Data:", payload);
            const response = await postData("/Auth/SignUp", payload);
            setSuccess(response.message || "User registered successfully!");
            setFormData({ RoleId: "", email: "", password: "", name: "" });
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Welcome to the new page</h1>
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
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <Suspense fallback={<p>Loading Dropdown...</p>}>
                                                            <Dropdown
                                                                type="role"
                                                                name="RoleId"
                                                                onSelect={(value) =>
                                                                    setFormData((prev) => ({ ...prev, RoleId: value }))
                                                                }
                                                            />
                                                        </Suspense>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <label>Email:</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">

                                                        <label htmlFor="firstName">User name</label>
                                                        <input type="text" id="firstName" className="form-control" name="name" value={formData.name} onChange={handleChange} />


                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <label>Password:</label>
                                                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <label htmlFor="motherName">Mother's name</label>
                                                            <input type="text" id="motherName" name="motherName" className="form-control" value={formData.motherName} onChange={handleChange} />

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <label htmlFor="fatherName">Father's name</label>
                                                            <input type="text" id="fatherName" name="fatherName" className="form-control " value={formData.fatherName} onChange={handleChange} />

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                                        <h6 className="mb-0 me-4">Gender:</h6>

                                                        <div className="form-check form-check-inline mb-0 me-4">
                                                            <input
                                                                className="form-check-input"
                                                                type="radio"
                                                                name="gender"
                                                                value="female"
                                                                checked={formData.gender === "female"}
                                                                onChange={handleChange}
                                                            />
                                                            <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                        </div>

                                                        <div className="form-check form-check-inline mb-0 me-4">
                                                            <input className="form-check-input" type="radio" name="gender" id="maleGender" value="male" checked={formData.gender === "male"}
                                                                onChange={handleChange} />
                                                            <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                        </div>

                                                        <div className="form-check form-check-inline mb-0">
                                                            <input className="form-check-input" type="radio" name="gender" id="otherGender" value="other" checked={formData.gender === "other"}
                                                                onChange={handleChange} />
                                                            <label className="form-check-label" htmlFor="otherGender">Other</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                                    {loading ? "Submitting..." : "Register"}
                                                </button>
                                            </form>
                                            {error && <p className="text-danger mt-2">{error}</p>}
                                            {success && <p className="text-success mt-2">{success}</p>}
                                            <p className="text-center text-muted mt-5 mb-0">
                                                Have an account?{" "}
                                                <a href="#!" className="fw-bold text-body">
                                                    <u>Login here</u>
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Registration;
