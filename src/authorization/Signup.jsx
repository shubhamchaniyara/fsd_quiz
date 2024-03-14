import React, {useState} from "react";
import "./LS.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
//import UserService from "../Service/UserService";

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        emailId: "",
        password: "",
        confPass: "",
    });

    const [errors, setErrors] = useState({
        passwordError: "",
        emailError: "",
    });

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));

        if (id === "emailId") {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    emailError: "Please enter a valid email address",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    emailError: "",
                }));
            }
        } else if (id === "password") {
            if (value.length < 6) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordError: "Password must be at least 6 characters long",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordError: "",
                }));
            }
        } else if (id === "confPass") {
            if (value !== formData.password) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confPassError: "Passwords do not match",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confPassError: "",
                }));
            }
        }

    };

    const saveData = async (e) => {
        e.preventDefault();

        try {
            if (formData.password !== formData.confPass) {
                alert("Passwords do not match");
                return;
            }
            console.log(formData);
            try{
                const response = await axios.post("http://localhost:8080/signup", formData);
                console.log("Response data:", response);
                const userId = response.data;
                console.log("User ID:", userId);
                localStorage.setItem('userId', userId);
            navigate('/home');
            }catch (error) {
                     console.error('Error saving user details:', error);
               }
           
        } catch (error) {
            console.log("Error occurred:", error.toJSON());
            if (error.response) {
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
                alert("Error: " + (error.response.data.message || "Something went wrong"));
            } else if (error.request) {
                console.error("Request:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
            console.error("Config:", error.config);
        }
    };

    return (
        <div className="login-page">
            <header className="header">
                <button className="btn">Login</button>
                <button className="btn">Signup</button>
            </header>
            <div className="form-container">
                <h2>SignUp</h2>
                <form onSubmit={saveData}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="userName"
                            placeholder="Username"
                            required
                            value={formData.userName}
                            onChange={handleChange}
                        />
                        {errors.userNameError && <p className="error">{errors.userNameError}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="emailId"
                            placeholder="Email"
                            required
                            value={formData.emailId}
                            onChange={handleChange}
                        />
                        {errors.emailError && <p className="error">{errors.emailError}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.passwordError && <p className="error">{errors.passwordError}</p>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            type="password"
                            id="confPass"
                            placeholder="Confirm Password"
                            required
                            value={formData.confPass}
                            onChange={handleChange}
                        />
                        {errors.confPassError && <p className="error">{errors.confPassError}</p>}
                    </div>
                    <button type="submit" className="btn login-btn">
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;