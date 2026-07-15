import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

function AIChat() {

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([

        {
            sender: "ai",
            text: "👋 Hello! I'm your AI Healthcare CRM Assistant.\n\nAsk me anything about doctors, interactions, follow-ups, analytics, or hospitals."
        }

    ]);

    async function sendMessage() {

        if (!message.trim()) return;

        const userMessage = {

            sender: "user",

            text: message

        };

        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        try {

            const response = await api.post("/assistant/chat", {

                message: message

            });

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: response.data.reply

                }

            ]);

        }

        catch (error) {

            console.log(error);

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: "❌ Unable to connect to AI Assistant."

                }

            ]);

        }

        finally {

            setLoading(false);

            setMessage("");

        }

    }

    function handleKeyPress(e) {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

        }

    }

    return (

        <>

            <Navbar />

            <div className="container dashboard">

                <div className="chat-page">

                    <div className="chat-header">

                        <div>

                            <h2>

                                🤖 AI CRM Assistant

                            </h2>

                            <p>

                                Ask questions about doctors, meetings and analytics

                            </p>

                        </div>

                        <span className="badge bg-success">

                            ● Online

                        </span>

                    </div>

                    <div className="chat-box">

                        {

                            messages.map((msg, index) => (

                                <div

                                    key={index}

                                    className={`message ${msg.sender}`}

                                >

                                    <div className="message-avatar">

                                        {

                                            msg.sender === "ai"

                                                ?

                                                "🤖"

                                                :

                                                "👤"

                                        }

                                    </div>

                                    <div className="message-text">

                                        {msg.text}

                                    </div>

                                </div>

                            ))

                        }

                        {

                            loading &&

                            <div className="message ai">

                                <div className="message-avatar">

                                    🤖

                                </div>

                                <div className="typing">

                                    <span></span>

                                    <span></span>

                                    <span></span>

                                </div>

                            </div>

                        }

                    </div>

                    <div className="chat-input">

                        <textarea

                            className="form-control"

                            rows="2"

                            placeholder="Ask AI anything..."

                            value={message}

                            onChange={(e) => setMessage(e.target.value)}

                            onKeyDown={handleKeyPress}

                        />

                        <button

                            className="btn btn-primary"

                            onClick={sendMessage}

                            disabled={loading}

                        >

                            <i className="bi bi-send-fill"></i>

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default AIChat;