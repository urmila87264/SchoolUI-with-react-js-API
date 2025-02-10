import React, { useState, lazy, Suspense, useCallback } from "react";
import { postData } from "./apiService";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";  // Optional: For Bootstrap JS components

// ✅ Lazy Load Dropdown for Performance
const Dropdown = lazy(() => import("./Cousedropdown"));
// Ensure this file exists

const Register = () => {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    // const handleCourseSelection = (course) => {
    //     setSelectedCourse(course);
    // };
    // const handleRolesSelection = (roles) => {
    //     setSelectedRoles(roles);
    // }
    const [formData, setFormData] = useState({
       roleID:"",
       email:"",
       userName:"",
       dob:"",
       password:"",
       confirmPassword:"",
       motherName:"",
       fatherName:"",
       gender:"",
       stateId:"",
       cityId:"",
       pincode:"",
       courseId:"",
      
       address:""

    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCourseSelection = useCallback((course) => {
        setSelectedCourse(course);
        setFormData((prev) => ({ ...prev, courseId: course }));
    }, []);

    const handleRolesSelection = useCallback((role) => {
        setSelectedRole(role);
        setFormData((prev) => ({ ...prev, role }));
    }, []);

    const handleSubmit = async (e) => {
        debugger;
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        // if (!formData.userName || !formData.email || !formData.password || !formData.confirmPassword) {
        //     setError("Please fill in all required fields.");
        //     setLoading(false);
        //     return;
        // }

        // if (formData.password !== formData.confirmPassword) {
        //     setError("Passwords do not match.");
        //     setLoading(false);
        //     return;
        // }

        try {
            debugger;
            const response = await postData("/Auth/SignUp", formData);
            setSuccess(response.message || "User registered successfully!");
            setFormData({
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                // role: "",
                motherName: "",
                fatherName: "",
                gender: "",
                stateId: "",
                cityId: "",
                pincode: "",
                dob: "",
                address: "",
                roleID: "",
                courseId: "",
            });
        } catch (err) {
            debugger;
            console.log(err.message);
            const d = err;
            alert(d)
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>

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
                                            {/* {error && <div className="alert alert-danger">{error}</div>}
                                            {error && <div className="alert alert-success">{success}</div>} */}
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        {/* <label> Role:</label> */}

                                                        {/* <Dropdowns options={roles}
                                                  
                                                    onSelectRole={setSelectedRole}
                                                    handleChange={handleRoleChange}
                                                   
                                                /> */}

                                                        <Suspense fallback={<p>Loading Dropdown...</p>}>
                                                            <Dropdown type="role" name="roleID" onSelect={(value) => setFormData((prev) => ({ ...prev, roleID: value }))} />
                                                        </Suspense>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <label>Email:</label>
                                                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handlechange} />

                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <label htmlFor="firstName">User name</label>
                                                            <input type="text" id="firstName" className="form-control" name="userName" value={formData.userName} onChange={handlechange} />

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <label htmlFor="dob">DOB</label>
                                                        <input type="date" id="dob" name="dob" className="form-control" value={formData.dob} onChange={handlechange} />

                                                    </div>
                                                    {/* <div className="col-md-6 mb-4">
                                                    <div className="form-outline">
                                                        <label htmlFor="lastName">Last name</label>
                                                        <input type="text" id="lastName" className="form-control form-control-lg" />

                                                    </div>
                                                </div> */}
                                                </div>
                                                <div className="row">

                                                    <div className="col-md-6 mb-4">
                                                        <label>Password:</label>
                                                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handlechange} />
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <label>Confirm Password:</label>
                                                        <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handlechange} />

                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <label htmlFor="motherName">Mother's name</label>
                                                            <input type="text" id="motherName" name="motherName" className="form-control" value={formData.motherName} onChange={handlechange} />

                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <label htmlFor="fatherName">Father's name</label>
                                                            <input type="text" id="fatherName" name="fatherName" className="form-control " value={formData.fatherName} onChange={handlechange} />

                                                        </div>
                                                    </div>
                                                </div>




                                                <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                                    <h6 className="mb-0 me-4">Gender:</h6>

                                                    <div className="form-check form-check-inline mb-0 me-4">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="gender"
                                                            value="female"
                                                            checked={formData.gender === "female"}
                                                            onChange={handlechange}
                                                        />
                                                        <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                                    </div>

                                                    <div className="form-check form-check-inline mb-0 me-4">
                                                        <input className="form-check-input" type="radio" name="gender" id="maleGender" value="male" checked={formData.gender === "male"}
                                                            onChange={handlechange} />
                                                        <label className="form-check-label" htmlFor="maleGender">Male</label>
                                                    </div>

                                                    <div className="form-check form-check-inline mb-0">
                                                        <input className="form-check-input" type="radio" name="gender" id="otherGender" value="other" checked={formData.gender === "other"}
                                                            onChange={handlechange} />
                                                        <label className="form-check-label" htmlFor="otherGender">Other</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <select className="form-select" name="stateId" value={formData.stateId} onChange={handlechange} >
                                                            <option value="1">State</option>
                                                            <option value="2">Option 1</option>
                                                            <option value="3">Option 2</option>
                                                            <option value="4">Option 3</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <select className="form-select" name="cityId" value={formData.cityId} onChange={handlechange}>
                                                            <option value="1">City</option>
                                                            <option value="2">Option 1</option>
                                                            <option value="3">Option 2</option>
                                                            <option value="4">Option 3</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <label htmlFor="pincode">Pincode</label>
                                                        <input type="text" id="pincode" className="form-control " name="pincode" value={formData.pincode} onChange={handlechange} />

                                                    </div>

                                                    <div className="col-md-6 mb-4">
                                                        {/* <label htmlFor="course">Course</label> */}
                                                        <Suspense fallback={<p>Loading Dropdown...</p>}>
                                                            <Dropdown type="course" name="courseId" onSelect={(value) => setFormData((prev) => ({ ...prev, courseId: value }))} />
                                                        </Suspense>
                                                        {/* <Dropdowns onSelectCourse={setSelectedCourse} />
                                                    <p className="mt-3 text-info">Selected Course: {selectedCourse}</p> */}
                                                        {/* <input type="text" id="course" className="form-control " /> */}

                                                    </div>
                                                </div>
                                                <div className="row">


                                                    <div className="col-lg-12 col-md-6 mb-4">
                                                        <label htmlFor="address">Address</label>
                                                        <input type="text" id="address" name="address" className="form-control form-control-lg" value={formData.address} onChange={handlechange} />

                                                    </div>
                                                </div>








                                                {/* <div className="form-outline mb-4">
                                                <input type="email" id="email" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="email">Email ID</label>
                                            </div> */}

                                                <div className="d-flex justify-content-end pt-3">
                                                    <button type="reset" className="btn btn-light btn-lg">Reset all</button>
                                                    <button type="submit" className="btn btn-warning btn-lg ms-2">Submit form</button>
                                                </div>
                                            </form>
                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                                                className="fw-bold text-body"><u>Login here</u></a></p>
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

export default Register;
