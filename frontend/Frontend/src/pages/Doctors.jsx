import { useEffect, useState } from "react";

import "../styles/doctors.css";

import Navbar from "../components/Navbar";
import DoctorCard from "../components/DoctorCard";
import DoctorForm from "../components/DoctorForm";
import { toast } from "react-toastify";

import api from "../api/api";

function Doctors() {

    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadDoctors();
    }, []);

    async function loadDoctors() {

        try {

            const { data } = await api.get("/doctors/");

            setDoctors(data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function deleteDoctor(id) {

        if (!window.confirm("Delete this doctor?")) {

            return;

        }

        try {

            await api.delete(`/doctors/${id}`);

            toast.success("Doctor deleted successfully!");

            loadDoctors();

        }

        catch (err) {

            console.log(err);

            toast.error("Unable to delete doctor.");

        }

    }

    const filteredDoctors = doctors.filter((doctor) =>

        (doctor.name || "").toLowerCase().includes(search.toLowerCase()) ||

        (doctor.hospital || "").toLowerCase().includes(search.toLowerCase()) ||

        (doctor.specialization || "").toLowerCase().includes(search.toLowerCase())

    );

    return (

        <>

            <Navbar />

            <div className="page">

                <div className="container doctors-page">

                    {/* Header */}

                    <div className="doctor-header">

                        <div>

                            <h1>

                                👨‍⚕️ Doctors

                            </h1>

                            <p>

                                Manage healthcare professionals

                            </p>

                        </div>

                        <DoctorForm
                            onDoctorAdded={loadDoctors}
                        />

                    </div>

                    {/* Search */}

                    <div className="doctor-search-box">

                        <i className="bi bi-search"></i>

                        <input

                            type="text"

                            className="form-control"

                            placeholder="Search doctor, hospital or specialization..."

                            value={search}

                            onChange={(e) => setSearch(e.target.value)}

                        />

                    </div>

                    {/* Statistics */}

                    <div className="doctor-stats">

                        <div className="glass-card stat-card">

                            <h3>{doctors.length}</h3>

                            <span>Total Doctors</span>

                        </div>

                        <div className="glass-card stat-card">

                            <h3>{filteredDoctors.length}</h3>

                            <span>Search Results</span>

                        </div>

                    </div>

                    {/* Doctor Grid */}

                    <div className="doctor-grid">

                        {

                            filteredDoctors.length === 0 ?

                                (

                                    <div className="glass-card empty-doctors">

                                        <i className="bi bi-person-x-fill"></i>

                                        <h2>

                                            No Doctors Found

                                        </h2>

                                        <p>

                                            Try another search or add a doctor.

                                        </p>

                                    </div>

                                )

                                :

                                (

                                    filteredDoctors.map((doctor) => (

                                        <DoctorCard

                                            key={doctor.id}

                                            doctor={doctor}

                                            onDelete={deleteDoctor}

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

export default Doctors;