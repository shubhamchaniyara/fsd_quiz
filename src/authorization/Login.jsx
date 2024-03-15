import React, {useState} from "react";
import "./LS.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
//import UserService from "../Service/UserService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loginError, setLoginError] = useState("");

    const handleChange = (e) => {
        const {id, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/login", formData).loginUser(formData)
            .then((response) => {
                console.log("Login successful", response.data);
                localStorage.setItem("token", response.data.token);
                navigate("/home");
            })
            .catch((error) => {
                console.error("Login failed", error.response);
                setLoginError("Failed to login. Please check your email and password.");
            });
    };

    return (
        <div className="login-page">
            <header className="header">
                <button className="btn" onClick={() => navigate("/login")}>Login</button>
                <button className="btn" onClick={() => navigate("/signup")}>Signup</button>
            </header>
            <div className="form-container">
                <h2>Login</h2>
                {loginError && <div className="error-message">{loginError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn login-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
