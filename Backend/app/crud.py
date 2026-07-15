from sqlalchemy.orm import Session

from app.models import Doctor, Interaction
from app.schemas import DoctorCreate, DoctorUpdate, InteractionCreate


# ==================================================
# Doctor CRUD
# ==================================================

def create_doctor(db: Session, doctor: DoctorCreate):

    db_doctor = Doctor(**doctor.model_dump())

    db.add(db_doctor)

    db.commit()

    db.refresh(db_doctor)

    return db_doctor


def get_all_doctors(db: Session):

    return db.query(Doctor).all()


def get_doctor(db: Session, doctor_id: int):

    return db.query(Doctor).filter(
        Doctor.id == doctor_id
    ).first()


def update_doctor(
    db: Session,
    doctor_id: int,
    doctor: DoctorUpdate
):

    db_doctor = get_doctor(db, doctor_id)

    if not db_doctor:
        return None

    for key, value in doctor.model_dump().items():
        setattr(db_doctor, key, value)

    db.commit()

    db.refresh(db_doctor)

    return db_doctor


def delete_doctor(
    db: Session,
    doctor_id: int
):

    doctor = get_doctor(db, doctor_id)

    if doctor:

        db.delete(doctor)

        db.commit()

    return doctor


# ==================================================
# Interaction CRUD
# ==================================================

def create_interaction(
    db: Session,
    interaction: InteractionCreate
):

    db_interaction = Interaction(
        **interaction.model_dump()
    )

    db.add(db_interaction)

    db.commit()

    db.refresh(db_interaction)

    return db_interaction


def get_all_interactions(db: Session):

    return db.query(Interaction).all()


def get_doctor_interactions(
    db: Session,
    doctor_id: int
):

    return (
        db.query(Interaction)
        .filter(
            Interaction.doctor_id == doctor_id
        )
        .all()
    )