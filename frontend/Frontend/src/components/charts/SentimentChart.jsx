import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import "../../styles/charts.css";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function SentimentChart({ stats }) {

    const data = {

        labels: [

            "Positive",

            "Neutral",

            "Negative",

        ],

        datasets: [

            {

                data: [

                    stats.positive,

                    stats.neutral,

                    stats.negative,

                ],

                backgroundColor: [

                    "#22c55e",

                    "#f59e0b",

                    "#ef4444",

                ],

                borderWidth: 0,

                hoverOffset: 15,

            },

        ],

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "70%",

        plugins: {

            legend: {

                position: "bottom",

                labels: {

                    color: "#ffffff",

                    usePointStyle: true,

                    pointStyle: "circle",

                    padding: 20,

                    font: {

                        size: 14,

                        weight: "600",

                    },

                },

            },

            tooltip: {

                backgroundColor: "#08192f",

                titleColor: "#ffffff",

                bodyColor: "#ffffff",

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

                    <i className="bi bi-pie-chart-fill"></i>

                    Sentiment Analysis

                </h4>

                <span className="chart-badge">

                    Live

                </span>

            </div>

            <div className="chart-body">

                <Doughnut

                    data={data}

                    options={options}

                />

            </div>

        </div>

    );

}

export default SentimentChart;