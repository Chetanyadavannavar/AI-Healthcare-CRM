import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";

import "../styles/history.css";

import api from "../api/api";

function History() {

    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadHistory();

    }, []);

    async function loadHistory() {

        try {

            const { data } = await api.get("/interactions/");

            setHistory(data);

        } catch (err) {

            console.log(err);

        }

    }

    const filtered = history.filter((item) =>

        (item.doctor_name || "")
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="container history-page">

                    <div className="history-header">

                        <div>

                            <h1>📜 Interaction History</h1>

                            <p>
                                View all AI analyzed doctor interactions.
                            </p>

                        </div>

                    </div>

                    <div className="history-search">

                        <i className="bi bi-search"></i>

                        <input

                            className="form-control"

                            placeholder="Search Doctor..."

                            value={search}

                            onChange={(e) =>
                                setSearch(e.target.value)
                            }

                        />

                    </div>

                    <div className="history-grid">

                        {

                            filtered.length === 0 ?

                                (

                                    <div className="empty-history">

                                        <i className="bi bi-clock-history"></i>

                                        <h2>No History Found</h2>

                                        <p>
                                            No interaction has been analyzed yet.
                                        </p>

                                    </div>

                                )

                                :

                                (

                                    filtered.map((item) => (

                                        <HistoryCard

                                            key={item.id}

                                            item={item}

                                        />

                                    ))

                                )

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default History;