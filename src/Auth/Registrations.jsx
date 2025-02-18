import React, { useState, lazy, Suspense, useCallback } from "react";
import { postData } from "./apiService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Optional: For Bootstrap JS components

const Dropdown = lazy(() => import("./Cousedropdown")); // Lazy load for better performance

const Register = () => {
    const [formData, setFormData] = useState({
        roleID: "",
        email: "",
        userName: "",
        dob: "",
        password: "",
        confirmPassword: "",
        motherName: "",
        fatherName: "",
        gender: "",
        stateId: "",
        cityId: "",
        pincode: "",
        courseId: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCourseSelection = useCallback((course) => {
        setFormData((prev) => ({ ...prev, courseId: course }));
    }, []);

    const handleRolesSelection = useCallback((role) => {
        setFormData((prev) => ({ ...prev, roleID: role }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // Basic validation
        if (!formData.userName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all required fields.");
            setLoading(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await postData("/Auth/SignUp", formData);
            setSuccess(response.message || "User registered successfully!");
            setFormData({
                roleID: "",
                email: "",
                userName: "",
                dob: "",
                password: "",
                confirmPassword: "",
                motherName: "",
                fatherName: "",
                gender: "",
                stateId: "",
                cityId: "",
                pincode: "",
                courseId: "",
                address: "",
            });
        } catch (err) {
            setError(err.message || "Something went wrong, please try again.");
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
                                        alt="Sample photo"
                                        className="img-fluid"
                                        style={{ borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem" }}
                                    />
                                </div>
                                <div className="col-xl-6">
                                    <div className="card-body p-md-5 text-black">
                                        <h3 className="mb-5 text-uppercase">Registration Form</h3>

                                        {error && <div className="alert alert-danger">{error}</div>}
                                        {success && <div className="alert alert-success">{success}</div>}

                                        <form onSubmit={handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <Suspense fallback={<p>Loading...</p>}>
                                                        <Dropdown type="role" name="roleID" onSelect={handleRolesSelection} />
                                                    </Suspense>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label>Email:</label>
                                                    <input type="email" className="form-control" name="email" required value={formData.email} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <label>User Name:</label>
                                                    <input type="text" className="form-control" name="userName" required value={formData.userName} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label>Date of Birth:</label>
                                                    <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <label>Password:</label>
                                                    <input type="password" className="form-control" name="password" required value={formData.password} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label>Confirm Password:</label>
                                                    <input type="password" className="form-control" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <label>State:</label>
                                                    <select className="form-select" name="stateId" value={formData.stateId} onChange={handleChange}>
                                                        <option value="">Select State</option>
                                                        <option value="1">Option 1</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <label>City:</label>
                                                    <select className="form-select" name="cityId" value={formData.cityId} onChange={handleChange}>
                                                        <option value="">Select City</option>
                                                        <option value="1">Option 1</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <label>Pincode:</label>
                                                    <input type="text" className="form-control" name="pincode" value={formData.pincode} onChange={handleChange} />
                                                </div>
                                                <div className="col-md-6 mb-4">
                                                    <Suspense fallback={<p>Loading...</p>}>
                                                        <Dropdown type="course" name="courseId" onSelect={handleCourseSelection} />
                                                    </Suspense>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end pt-3">
                                                <button type="reset" className="btn btn-light btn-lg">Reset all</button>
                                                <button type="submit" className="btn btn-warning btn-lg ms-2" disabled={loading}>
                                                    {loading ? "Submitting..." : "Submit"}
                                                </button>
                                            </div>
                                        </form>
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

export default Register;
