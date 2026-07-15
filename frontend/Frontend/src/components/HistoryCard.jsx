function HistoryCard({ item }) {

    const sentiment =
        item.sentiment?.toLowerCase() || "neutral";

    function badgeClass() {

        if (sentiment === "positive") return "positive";

        if (sentiment === "negative") return "negative";

        return "neutral";

    }

    function icon() {

        if (sentiment === "positive")
            return "bi bi-emoji-smile-fill";

        if (sentiment === "negative")
            return "bi bi-emoji-frown-fill";

        return "bi bi-emoji-neutral-fill";

    }

    return (

        <div className="glass-card history-card">

            {/* Header */}

            <div className="history-top">

                <div>

                    <h3>

                        <i className="bi bi-person-badge-fill me-2"></i>

                        {item.doctor_name}

                    </h3>

                    <small>

                        {item.date || "Recent Interaction"}

                    </small>

                </div>

                <span className={`history-badge ${badgeClass()}`}>

                    <i className={`${icon()} me-2`}></i>

                    {item.sentiment}

                </span>

            </div>

            {/* Summary */}

            <div className="history-section">

                <h5>

                    <i className="bi bi-file-earmark-text-fill me-2"></i>

                    Summary

                </h5>

                <p>

                    {item.summary}

                </p>

            </div>

            {/* Follow Up */}

            <div className="history-section">

                <h5>

                    <i className="bi bi-calendar-check-fill me-2"></i>

                    Follow-up

                </h5>

                <p>

                    {item.follow_up}

                </p>

            </div>

        </div>

    );

}

export default HistoryCard;