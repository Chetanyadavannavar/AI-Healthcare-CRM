import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "../../styles/charts.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function TopDoctorsChart({ data = [] }) {

    if (data.length === 0) {

        return (

            <div className="glass-card chart-card empty-chart">

                <i className="bi bi-bar-chart-fill empty-icon"></i>

                <h3>No Interaction Data</h3>

                <p>Add doctor interactions to see analytics.</p>

            </div>

        );

    }

    const chartData = {

        labels: data.map((doctor) => doctor.name),

        datasets: [

            {

                label: "Meetings",

                data: data.map((doctor) => doctor.meetings),

                backgroundColor: [
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                ],

                borderRadius: 12,

                borderSkipped: false,

                barThickness: 22,

            },

        ],

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        indexAxis: "y",

        plugins: {

            legend: {

                display: false,

            },

            tooltip: {

                backgroundColor: "#08192f",

                titleColor: "#fff",

                bodyColor: "#fff",

            },

        },

        scales: {

            x: {

                beginAtZero: true,

                ticks: {

                    color: "#cbd5e1",

                },

                grid: {

                    color: "rgba(255,255,255,.08)",

                },

            },

            y: {

                ticks: {

                    color: "#ffffff",

                    font: {

                        size: 13,

                    },

                },

                grid: {

                    display: false,

                },

            },

        },

        animation: {

            duration: 1500,

        },

    };

    return (

        <div className="glass-card chart-card">

            <div className="chart-header">

                <h4>

                    <i className="bi bi-bar-chart-fill"></i>

                    Top Doctors

                </h4>

                <span className="chart-badge">

                    Updated

                </span>

            </div>

            <div className="chart-body">

                <Bar
                    data={chartData}
                    options={options}
                />

            </div>

        </div>

    );

}

export default TopDoctorsChart;