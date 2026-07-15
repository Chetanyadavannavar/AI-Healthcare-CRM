import { useEffect, useState } from "react";
import api from "../api/api";

function HCPList({ selectedDoctor, setSelectedDoctor }) {

    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadDoctors();
    }, []);

    async function loadDoctors() {
        try {
            const { data } = await api.get("/doctors/");
            setDoctors(data);
        } catch (err) {
            console.log(err);
        }
    }

    const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>

            {/* Search */}

            <div className="doctor-search">

                <i className="bi bi-search"></i>

                <input
                    className="form-control"
                    placeholder="Search doctor..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Doctor List */}

            <div className="doctor-list">

                {filtered.length === 0 ? (

                    <div className="empty-doctor">

                        <i className="bi bi-person-x"></i>

                        <h5>No Doctors Found</h5>

                        <p>Try another search keyword.</p>

                    </div>

                ) : (

                    filtered.map((doctor) => (

                        <div
                            key={doctor.id}
                            className={`doctor-item ${selectedDoctor === doctor.id ? "doctor-active" : ""
                                }`}
                            onClick={() => setSelectedDoctor(doctor.id)}
                        >

                            <i className="bi bi-person-circle doctor-avatar"></i>

                            <div className="doctor-info">

                                <h6>{doctor.name}</h6>

                                <span>
                                    {doctor.specialization || "General Physician"}
                                </span>

                                <small>
                                    {doctor.hospital || "Healthcare Center"}
                                </small>

                            </div>

                            {selectedDoctor === doctor.id && (

                                <i className="bi bi-check-circle-fill selected-icon"></i>

                            )}

                        </div>

                    ))

                )}

            </div>

        </>
    );
}

export default HCPList;