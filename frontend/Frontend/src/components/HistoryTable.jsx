import { useEffect, useState } from "react";
import api from "../api/api";

function HistoryTable() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    async function loadHistory() {

        try {

            const { data } = await api.get("/interactions/");

            setHistory(data);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="history-card">

            <div className="table-responsive">

                <table className="table history-table">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Doctor</th>

                            <th>Date</th>

                            <th>Summary</th>

                            <th>Sentiment</th>

                            <th>Follow Up</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            history.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center text-light p-5"
                                    >

                                        No Interaction Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                history.map((item)=>(

                                    <tr key={item.id}>

                                        <td>{item.id}</td>

                                        <td>

                                            {item.doctor?.name || "-"}

                                        </td>

                                        <td>

                                            {item.interaction_date}

                                        </td>

                                        <td>

                                            {item.summary}

                                        </td>

                                        <td>

                                            <span
                                                className={`status-badge ${
                                                    item.sentiment?.toLowerCase()
                                                }`}
                                            >

                                                {item.sentiment}

                                            </span>

                                        </td>

                                        <td>

                                            {item.follow_up}

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default HistoryTable;