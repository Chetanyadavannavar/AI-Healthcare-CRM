import "../styles/dashboardCard.css";

function DashboardCard({ title, value, icon, color }) {

    return (

        <div className="dashboard-card glass-card">

            <div className="card-top">

                <div>

                    <p className="card-title">

                        {title}

                    </p>

                    <h2 className="card-value">

                        {value}

                    </h2>

                </div>

                <div
                    className="card-icon"
                    style={{
                        background: `linear-gradient(135deg,${color},#7c3aed)`
                    }}
                >

                    <i className={icon}></i>

                </div>

            </div>

            <div className="card-footer">

                <div className="live-data">

                    <span className="live-dot"></span>

                    Live Data

                </div>

                <i
                    className="bi bi-arrow-up-right"
                    style={{ color }}
                ></i>

            </div>

        </div>

    );

}

export default DashboardCard;