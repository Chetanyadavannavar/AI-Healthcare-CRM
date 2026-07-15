import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    }

    function login(e) {

        e.preventDefault();

        if (!user.email.trim() || !user.password.trim()) {

            toast.warning("Please enter your email and password.");

            return;

        }

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {

            toast.error("No account found. Please create an account first.");

            navigate("/signup");

            return;

        }

        if (
            savedUser.email !== user.email ||
            savedUser.password !== user.password
        ) {

            toast.error("Invalid email or password.");

            return;

        }

        localStorage.setItem("loggedIn", "true");

        toast.success(`Welcome back, ${savedUser.name}!`);

        navigate("/");

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">

                    <i className="bi bi-heart-pulse-fill"></i>

                    <h1>AI Healthcare CRM</h1>

                    <p>Welcome back! Please login.</p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={login}
                >

                    <div>

                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={user.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={user.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="auth-remember">

                        <label>

                            <input type="checkbox" />

                            Remember Me

                        </label>

                        <a href="#">

                            Forgot Password?

                        </a>

                    </div>

                    <button
                        type="submit"
                        className="btn auth-btn"
                    >

                        <i className="bi bi-box-arrow-in-right me-2"></i>

                        Login

                    </button>

                </form>

                <div className="auth-divider">

                    <span>OR</span>

                </div>

                <div className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/signup">

                        Sign Up

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;