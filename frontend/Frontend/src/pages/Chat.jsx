import { useState } from "react";
import api from "../api/api";

function Chat() {
    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    async function analyze() {

        if (!message.trim()) {
            alert("Please enter an interaction.");
            return;
        }

        setLoading(true);

        try {

            const response = await api.post("/chat/", {
                hcp_id: 2,
                interaction: message
            });

            console.log(response.data);

            setResult(response.data);

        } catch (error) {
            console.error(error);

            if (error.response) {
                alert("Backend Error: " + JSON.stringify(error.response.data));
            } else {
                alert("Cannot connect to backend.");
            }

        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: "30px" }}>

            <h1>AI CRM Assistant</h1>

            <textarea
                rows="8"
                cols="70"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your interaction here..."
            />

            <br /><br />

            <button onClick={analyze} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze"}
            </button>

            <br /><br />

            {result && (
                <div>

                    <h3>Summary</h3>
                    <p>{result.summary}</p>

                    <h3>Sentiment</h3>
                    <p>{result.sentiment}</p>

                    <h3>Follow-up</h3>
                    <p>{result.follow_up}</p>

                </div>
            )}

        </div>
    );
}

export default Chat;