import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/auth.css";

function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(e) {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    }

    function signup(e) {

        e.preventDefault();

        if (
            !user.name.trim() ||
            !user.email.trim() ||
            !user.password.trim() ||
            !user.confirmPassword.trim()
        ) {

            toast.warning("Please fill all fields.");

            return;

        }

        if (user.password !== user.confirmPassword) {

            toast.error("Passwords do not match.");

            return;

        }

        // Store user locally (Demo Only)
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: user.name,
                email: user.email,
                password: user.password,
            })
        );

        toast.success("Account created successfully!");

        navigate("/login");

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">

                    <i className="bi bi-heart-pulse-fill"></i>

                    <h1>AI Healthcare CRM</h1>

                    <p>Create your account</p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={signup}
                >

                    <div>

                        <label>Full Name</label>

                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter your full name"
                            value={user.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Create password"
                            value={user.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label>Confirm Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={user.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <button
                        className="btn auth-btn"
                        type="submit"
                    >

                        Create Account

                    </button>

                </form>

                <div className="auth-divider">

                    <span>OR</span>

                </div>

                <div className="auth-footer">

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Signup;