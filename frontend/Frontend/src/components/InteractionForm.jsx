import { useState } from "react";
import "../styles/interaction.css";

import api from "../api/api";
import HCPList from "./HCPList";
import AIResult from "./AIResult";
import { toast } from "react-toastify";

function InteractionForm() {

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [interaction, setInteraction] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    async function analyze() {

        if (!selectedDoctor) {

            toast.warning("Please select a doctor.");

            return;

        }

        if (!interaction.trim()) {

            toast.warning("Please enter interaction notes.");

            return;

        }

        try {

            setLoading(true);

            const { data } = await api.post("/interactions/", {

                doctor_id: selectedDoctor,

                interaction_notes: interaction

            });

            setResult(data);

            toast.success("Interaction analyzed successfully!");

        }

        catch (err) {

            console.log(err);

            toast.error("AI analysis failed.");

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <section className="interaction-layout">

            {/* LEFT PANEL */}

            <div className="glass-card interaction-panel">

                <div className="interaction-header">

                    <div>

                        <h2>
                            🤖 AI Interaction Assistant
                        </h2>

                        <p>
                            Select a healthcare professional and let AI analyze the discussion.
                        </p>

                    </div>

                    <span className="online-badge">
                        ● AI Online
                    </span>

                </div>

                <HCPList
                    selectedDoctor={selectedDoctor}
                    setSelectedDoctor={setSelectedDoctor}
                />

                <textarea
                    className="form-control interaction-textarea"
                    placeholder={`Example:

• Doctor discussed new diabetes therapy.

• Requested clinical trial documents.

• Interested in follow-up meeting.

• Wants product comparison.`}
                    value={interaction}
                    onChange={(e) => setInteraction(e.target.value)}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "12px",
                        color: "#94a3b8",
                        fontSize: "14px",
                    }}
                >

                    <span>
                        Describe the meeting in detail.
                    </span>

                    <span>
                        {interaction.length} Characters
                    </span>

                </div>

                <div className="action-buttons">

                    <button
                        className="btn btn-primary"
                        onClick={analyze}
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                ></span>

                                AI is analyzing...
                            </>
                        ) : (
                            <>
                                ✨ Analyze Interaction
                            </>
                        )}

                    </button>

                </div>

            </div>

            {/* RIGHT PANEL */}

            <div className="glass-card interaction-panel">

                <AIResult
                    loading={loading}
                    result={result}
                />

            </div>

        </section>

    );

}

export default InteractionForm;