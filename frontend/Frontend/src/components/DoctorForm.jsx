import { useState } from "react";
import * as bootstrap from "bootstrap";
import api from "../api/api";
import { toast } from "react-toastify";

function DoctorForm({ onDoctorAdded }) {

    const [doctor, setDoctor] = useState({
        name: "",
        hospital: "",
        specialization: "",
    });

    function handleChange(e) {

        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value,
        });

    }

    async function saveDoctor() {

        if (
            !doctor.name.trim() ||
            !doctor.hospital.trim() ||
            !doctor.specialization.trim()
        ) {
            toast.warning("Please fill all fields.");
            return;
        }

        try {

            await api.post("/doctors/", doctor);

            // Reload doctors list
            await onDoctorAdded();

            toast.success("Doctor added successfully!");

            // Reset form
            setDoctor({
                name: "",
                hospital: "",
                specialization: "",
            });

            // Close Bootstrap modal
            const modalElement = document.getElementById("doctorModal");

            const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

            modal.hide();

            // Remove leftover backdrop
            setTimeout(() => {

                document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
                    backdrop.remove();
                });

                document.body.classList.remove("modal-open");
                document.body.style.removeProperty("padding-right");
                document.body.style.removeProperty("overflow");

            }, 200);

        } catch (err) {

            console.log(err);

            toast.error("Unable to add doctor.");

        }

    }
    return (
        <>

            <button
                className="btn btn-primary add-doctor-btn"
                data-bs-toggle="modal"
                data-bs-target="#doctorModal"
            >
                <i className="bi bi-plus-circle-fill me-2"></i>

                Add Doctor
            </button>

            <div
                className="modal fade"
                id="doctorModal"
                tabIndex="-1"
                aria-hidden="true"
            >

                <div className="modal-dialog modal-dialog-centered modal-lg">

                    <div className="modal-content doctor-modal">

                        <div className="modal-header">

                            <h4 className="modal-title">

                                👨‍⚕️ Add New Doctor

                            </h4>

                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                            ></button>

                        </div>

                        <div className="modal-body">

                            <div className="mb-3">

                                <label className="form-label">

                                    Doctor Name

                                </label>

                                <input
                                    className="form-control"
                                    name="name"
                                    value={doctor.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">

                                    Hospital

                                </label>

                                <input
                                    className="form-control"
                                    name="hospital"
                                    value={doctor.hospital}
                                    onChange={handleChange}
                                />

                            </div>

                            <div>

                                <label className="form-label">

                                    Specialization

                                </label>

                                <input
                                    className="form-control"
                                    name="specialization"
                                    value={doctor.specialization}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={saveDoctor}
                            >
                                <i className="bi bi-check-circle-fill me-2"></i>

                                Save Doctor
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );

}

export default DoctorForm;