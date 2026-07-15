import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import "../styles/profile.css";

import Navbar from "../components/Navbar";
import api from "../api/api";

function DoctorProfile() {

    const { id } = useParams();

    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        loadDoctor();
    }, []);

    async function loadDoctor() {

        try {

            const { data } = await api.get(`/doctors/${id}`);

            setDoctor(data);

        } catch (err) {

            console.log(err);

        }

    }

    if (!doctor) {

        return (

            <>

                <Navbar />

                <div className="page">

                    <div className="container profile-page">

                        <div className="profile-loading">

                            <div className="spinner-border text-primary"></div>

                            <h3 className="mt-4">

                                Loading Doctor...

                            </h3>

                        </div>

                    </div>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="container profile-page">

                    {/* Profile Header */}

                    <div className="glass-card profile-header">

                        <div className="profile-left">

                            <div className="profile-avatar">

                                <i className="bi bi-person-circle"></i>

                            </div>

                            <div>

                                <h1>{doctor.name}</h1>

                                <p>{doctor.specialization}</p>

                            </div>

                        </div>

                        <span className="profile-status">

                            Active

                        </span>

                    </div>

                    {/* Statistics */}

                    <div className="profile-stats">

                        <div className="glass-card stat-box">

                            <i className="bi bi-chat-dots-fill"></i>

                            <h2>24</h2>

                            <span>Total Interactions</span>

                        </div>

                        <div className="glass-card stat-box">

                            <i className="bi bi-emoji-smile-fill"></i>

                            <h2>18</h2>

                            <span>Positive</span>

                        </div>

                        <div className="glass-card stat-box">

                            <i className="bi bi-emoji-neutral-fill"></i>

                            <h2>5</h2>

                            <span>Neutral</span>

                        </div>

                        <div className="glass-card stat-box">

                            <i className="bi bi-emoji-frown-fill"></i>

                            <h2>1</h2>

                            <span>Negative</span>

                        </div>

                    </div>

                    {/* Main Grid */}

                    <div className="profile-grid">

                        {/* Doctor Information */}

                        <div className="glass-card profile-info-card">

                            <h3>

                                👨‍⚕️ Doctor Information

                            </h3>

                            <div className="profile-row">

                                <i className="bi bi-person-badge-fill"></i>

                                <div>

                                    <span>Name</span>

                                    <strong>{doctor.name}</strong>

                                </div>

                            </div>

                            <div className="profile-row">

                                <i className="bi bi-heart-pulse-fill"></i>

                                <div>

                                    <span>Specialization</span>

                                    <strong>

                                        {doctor.specialization}

                                    </strong>

                                </div>

                            </div>

                            <div className="profile-row">

                                <i className="bi bi-hospital-fill"></i>

                                <div>

                                    <span>Hospital</span>

                                    <strong>

                                        {doctor.hospital}

                                    </strong>

                                </div>

                            </div>

                        </div>

                        {/* AI Insight */}

                        <div className="glass-card profile-info-card">

                            <h3>

                                🤖 AI Insights

                            </h3>

                            <div className="ai-insight">

                                <p>

                                    Based on the recent interaction history,
                                    this doctor demonstrates a strong level of
                                    engagement and interest in medical updates.

                                </p>

                                <ul>

                                    <li>

                                        ✔ High engagement with medical representatives

                                    </li>

                                    <li>

                                        ✔ Positive sentiment in recent meetings

                                    </li>

                                    <li>

                                        ✔ Good candidate for future follow-up

                                    </li>

                                    <li>

                                        ✔ Strong relationship with healthcare team

                                    </li>

                                </ul>

                            </div>

                        </div>

                    </div>

                    {/* Back Button */}

                    <Link

                        to="/doctors"

                        className="btn btn-primary profile-back"

                    >

                        <i className="bi bi-arrow-left me-2"></i>

                        Back to Doctors

                    </Link>

                </div>

            </div>

        </>

    );

}

export default DoctorProfile;