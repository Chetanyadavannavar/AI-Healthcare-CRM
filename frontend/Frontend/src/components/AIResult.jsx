function AIResult({ loading, result }) {

    if (loading) {

        return (

            <div className="ai-loading">

                <div className="spinner-border text-primary"></div>

                <h2 className="mt-4">
                    AI is analyzing...
                </h2>

                <p>
                    Reading the interaction, identifying sentiment and generating follow-up recommendations.
                </p>

            </div>

        );

    }

    if (!result) {

        return (

            <div className="ai-empty">

                <i className="bi bi-cpu-fill ai-icon"></i>

                <h2>AI Assistant</h2>

                <p>
                    Select a doctor, write your interaction notes and let AI generate intelligent insights.
                </p>

                <div className="feature-list">

                    <div>

                        <i className="bi bi-file-earmark-text-fill"></i>

                        <div>

                            <strong>Summary</strong>

                            <small>Generate meeting summary</small>

                        </div>

                    </div>

                    <div>

                        <i className="bi bi-emoji-smile-fill"></i>

                        <div>

                            <strong>Sentiment</strong>

                            <small>Positive / Neutral / Negative</small>

                        </div>

                    </div>

                    <div>

                        <i className="bi bi-calendar-check-fill"></i>

                        <div>

                            <strong>Follow-up</strong>

                            <small>Recommended next action</small>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

    const sentiment = result.sentiment.toLowerCase();

    return (

        <>

            <div className="result-title">

                <i className="bi bi-stars"></i>

                AI Analysis Result

            </div>

            <div className="result-card">

                <h5>

                    <i className="bi bi-file-earmark-text-fill me-2"></i>

                    Meeting Summary

                </h5>

                <p>

                    {result.summary}

                </p>

            </div>

            <div className="result-card">

                <h5>

                    <i className="bi bi-emoji-smile-fill me-2"></i>

                    Sentiment Analysis

                </h5>

                <span className={`sentiment-badge ${sentiment}`}>

                    {result.sentiment}

                </span>

            </div>

            <div className="result-card">

                <h5>

                    <i className="bi bi-calendar-check-fill me-2"></i>

                    Recommended Follow-up

                </h5>

                <p>

                    {result.follow_up}

                </p>

            </div>

        </>

    );

}

export default AIResult;