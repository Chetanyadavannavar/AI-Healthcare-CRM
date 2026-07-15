from langchain_core.tools import tool
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Doctor


@tool
def get_all_doctors() -> str:
    """
    Returns all doctors.
    """

    db: Session = SessionLocal()

    try:

        doctors = db.query(Doctor).all()

        if not doctors:
            return "No doctors found."

        result = []

        for doctor in doctors:

            result.append(
                f"""
ID: {doctor.id}

Name: {doctor.name}

Hospital: {doctor.hospital}

Specialization: {doctor.specialization}

Phone: {doctor.phone}

Email: {doctor.email}
"""
            )

        return "\n-------------------------\n".join(result)

    finally:

        db.close()


@tool
def search_doctor(name: str) -> str:
    """
    Search doctor by name.
    """

    db: Session = SessionLocal()

    try:

        doctors = (
            db.query(Doctor)
            .filter(Doctor.name.ilike(f"%{name}%"))
            .all()
        )

        if not doctors:
            return "Doctor not found."

        output = []

        for doctor in doctors:

            output.append(
                f"""
ID: {doctor.id}

Name: {doctor.name}

Hospital: {doctor.hospital}

Specialization: {doctor.specialization}
"""
            )

        return "\n-------------------------\n".join(output)

    finally:

        db.close()


@tool
def doctor_count() -> str:
    """
    Returns total doctors.
    """

    db: Session = SessionLocal()

    try:

        return f"Total Doctors : {db.query(Doctor).count()}"

    finally:

        db.close()


@tool
def doctor_specialization(specialization: str) -> str:
    """
    Search doctors by specialization.
    """

    db: Session = SessionLocal()

    try:

        doctors = (
            db.query(Doctor)
            .filter(
                Doctor.specialization.ilike(
                    f"%{specialization}%"
                )
            )
            .all()
        )

        if not doctors:
            return "No doctors found."

        return "\n".join(
            [
                f"{d.name} - {d.hospital}"
                for d in doctors
            ]
        )

    finally:

        db.close()


@tool
def get_doctor_details(doctor_id: int) -> str:
    """
    Returns doctor details.
    """

    db: Session = SessionLocal()

    try:

        doctor = (
            db.query(Doctor)
            .filter(
                Doctor.id == doctor_id
            )
            .first()
        )

        if not doctor:
            return "Doctor not found."

        return f"""
Doctor ID : {doctor.id}

Name : {doctor.name}

Hospital : {doctor.hospital}

Specialization : {doctor.specialization}

Phone : {doctor.phone}

Email : {doctor.email}

Address : {doctor.address}

Availability : {doctor.availability}
"""

    finally:

        db.close()