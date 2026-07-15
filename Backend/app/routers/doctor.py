from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/doctors",
    tags=["Doctors"]
)


# ===========================================
# Create Doctor
# ===========================================

@router.post(
    "/",
    response_model=schemas.DoctorResponse
)
def create_doctor(
    doctor: schemas.DoctorCreate,
    db: Session = Depends(get_db)
):

    return crud.create_doctor(
        db,
        doctor
    )


# ===========================================
# Get All Doctors
# ===========================================

@router.get(
    "/",
    response_model=list[schemas.DoctorResponse]
)
def get_doctors(
    db: Session = Depends(get_db)
):

    return crud.get_all_doctors(
        db
    )


# ===========================================
# Get Doctor By ID
# ===========================================

@router.get(
    "/{doctor_id}",
    response_model=schemas.DoctorResponse
)
def get_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):

    doctor = crud.get_doctor(
        db,
        doctor_id
    )

    if doctor is None:

        raise HTTPException(
            status_code=404,
            detail="Doctor not found."
        )

    return doctor


# ===========================================
# Update Doctor
# ===========================================

@router.put(
    "/{doctor_id}",
    response_model=schemas.DoctorResponse
)
def update_doctor(
    doctor_id: int,
    doctor: schemas.DoctorUpdate,
    db: Session = Depends(get_db)
):

    updated = crud.update_doctor(
        db,
        doctor_id,
        doctor
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Doctor not found."
        )

    return updated


# ===========================================
# Delete Doctor
# ===========================================

@router.delete(
    "/{doctor_id}"
)
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):

    deleted = crud.delete_doctor(
        db,
        doctor_id
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="Doctor not found."
        )

    return {
        "message": "Doctor deleted successfully."
    }