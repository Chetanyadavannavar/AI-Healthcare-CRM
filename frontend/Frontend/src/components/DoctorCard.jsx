import { Link } from "react-router-dom";

function DoctorCard({ doctor, onDelete }) {

    return (

        <div className="glass-card doctor-card">

            {/* Header */}

            <div className="doctor-card-header">

                <div className="doctor-avatar">

                    <i className="bi bi-person-circle"></i>

                </div>

                <div className="doctor-details">

                    <h3>

                        {doctor.name}

                    </h3>

                    <span className="doctor-specialization">

                        {doctor.specialization || "General Physician"}

                    </span>

                </div>

                <span className="doctor-status">

                    Active

                </span>

            </div>

            {/* Body */}

            <div className="doctor-meta">

                <div>

                    <i className="bi bi-hospital"></i>

                    <span>

                        {doctor.hospital || "Healthcare Center"}

                    </span>

                </div>

                <div>

                    <i className="bi bi-heart-pulse"></i>

                    <span>

                        Healthcare Professional

                    </span>

                </div>

            </div>

            {/* Footer */}

            <div className="doctor-actions">

                <Link

                    to={`/doctor/${doctor.id}`}

                    className="btn btn-primary"

                >

                    <i className="bi bi-eye-fill me-2"></i>

                    View Profile

                </Link>

                <button

                    className="btn btn-outline-danger"

                    onClick={() => onDelete(doctor.id)}

                >

                    <i className="bi bi-trash-fill me-2"></i>

                    Delete

                </button>

            </div>

        </div>

    );

}

export default DoctorCard;