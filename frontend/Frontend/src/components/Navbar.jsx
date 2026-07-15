import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {

        localStorage.removeItem("loggedIn");

        toast.success("Logged out successfully!");

        navigate("/login");

    }

    return (

        <nav className="navbar navbar-expand-lg">

            <div className="container">

                <NavLink
                    to="/"
                    className="navbar-brand"
                >

                    🏥 AI Healthcare CRM

                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >

                    <span className="navbar-toggler-icon"></span>

                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-center">

                        <li className="nav-item">

                            <NavLink
                                to="/"
                                className="nav-link"
                            >
                                Dashboard
                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                to="/doctors"
                                className="nav-link"
                            >
                                Doctors
                            </NavLink>

                        </li>

                        <li className="nav-item">

                            <NavLink
                                to="/history"
                                className="nav-link"
                            >
                                History
                            </NavLink>

                        </li>

                        <li className="nav-item ms-3">

                            <div className="user-name">

                                <div className="user-avatar">

                                    <i className="bi bi-person-fill"></i>

                                </div>

                                <span>

                                    {user?.name || "User"}

                                </span>

                            </div>

                        </li>

                        <li className="nav-item ms-3">

                            <button
                                className="btn btn-danger logout-btn"
                                onClick={logout}
                            >

                                <i className="bi bi-box-arrow-right me-2"></i>

                                Logout

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;