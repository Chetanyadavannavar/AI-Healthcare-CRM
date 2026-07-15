import { useEffect, useState } from "react";

import "../styles/dashboard.css";

import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import InteractionForm from "../components/InteractionForm";
import SentimentChart from "../components/charts/SentimentChart";
import TopDoctorsChart from "../components/charts/TopDoctorsChart";

import api from "../api/api";

function Dashboard() {

    const [stats, setStats] = useState({
        doctors: 0,
        interactions: 0,
        positive: 0,
        neutral: 0,
        negative: 0,
    });

    const [topDoctors, setTopDoctors] = useState([]);

    useEffect(() => {

        loadDashboard();
        loadTopDoctors();

    }, []);

    async function loadDashboard() {

        try {

            const { data } = await api.get("/dashboard/stats");

            setStats(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function loadTopDoctors() {

        try {

            const { data } = await api.get("/dashboard/top-doctors");

            setTopDoctors(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    function greeting() {

        const hour = new Date().getHours();

        if (hour < 12) return "🌅 Good Morning, Chetan";

        if (hour < 17) return "☀️ Good Afternoon, Chetan";

        return "🌙 Good Evening, Chetan";

    }

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="container dashboard">

                    {/* Hero */}

                    <section className="hero">

                        <div className="hero-left">

                            <h1>{greeting()}</h1>

                            <p>

                                AI Powered Healthcare CRM Dashboard

                            </p>

                        </div>

                        <div className="date-box">

                            <i className="bi bi-calendar-event-fill"></i>

                            <span>

                                {new Date().toLocaleDateString()}

                            </span>

                        </div>

                    </section>

                    {/* KPI */}

                    <section className="stats-grid">

                        <DashboardCard
                            title="Doctors"
                            value={stats.doctors}
                            icon="bi bi-person-badge-fill"
                            color="#2563eb"
                        />

                        <DashboardCard
                            title="Interactions"
                            value={stats.interactions}
                            icon="bi bi-chat-left-dots-fill"
                            color="#10b981"
                        />

                        <DashboardCard
                            title="Positive"
                            value={stats.positive}
                            icon="bi bi-emoji-smile-fill"
                            color="#22c55e"
                        />

                        <DashboardCard
                            title="Neutral"
                            value={stats.neutral}
                            icon="bi bi-emoji-neutral-fill"
                            color="#f59e0b"
                        />

                        <DashboardCard
                            title="Negative"
                            value={stats.negative}
                            icon="bi bi-emoji-frown-fill"
                            color="#ef4444"
                        />

                    </section>

                    {/* Charts */}

                    <section className="chart-grid">

                        <SentimentChart
                            stats={stats}
                        />

                        <TopDoctorsChart
                            data={topDoctors}
                        />

                    </section>

                    {/* Insights */}

                    <section className="info-grid">

                        <div className="glass-card info-card">

                            <h3>

                                ⭐ AI Insights

                            </h3>

                            <p>

                                <strong>{stats.doctors}</strong> doctors are currently managed.

                            </p>

                            <p>

                                <strong>{stats.interactions}</strong> interactions have been analyzed.

                            </p>

                            <p>

                                Positive engagement is currently the dominant sentiment.

                            </p>

                        </div>

                        <div className="glass-card info-card">

                            <h3>

                                🏆 Top Doctors

                            </h3>

                            {

                                topDoctors.length === 0 ?

                                    (

                                        <p>No interaction data available.</p>

                                    )

                                    :

                                    (

                                        topDoctors.map((doctor) => (

                                            <div
                                                key={doctor.id}
                                                className="doctor-row"
                                            >

                                                <span>

                                                    {doctor.name}

                                                </span>

                                                <strong>

                                                    {doctor.meetings}

                                                </strong>

                                            </div>

                                        ))

                                    )

                            }

                        </div>

                    </section>

                    {/* AI Assistant */}

                    <InteractionForm />

                </div>

            </div>

        </>

    );

}

export default Dashboard;