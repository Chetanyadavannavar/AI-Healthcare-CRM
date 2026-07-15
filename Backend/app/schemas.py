from datetime import date
from typing import Optional

from pydantic import BaseModel


# -------------------------
# Doctor
# -------------------------

class DoctorBase(BaseModel):
    name: str
    hospital: str
    specialization: str
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    availability: Optional[str] = None
    hospital_phone: Optional[str] = None
    emergency_phone: Optional[str] = None


class DoctorCreate(DoctorBase):
    pass


class DoctorUpdate(DoctorBase):
    pass


class DoctorResponse(DoctorBase):
    id: int

    class Config:
        from_attributes = True


# -------------------------
# Interaction Request
# -------------------------

class InteractionRequest(BaseModel):
    doctor_id: int
    interaction_notes: str


# -------------------------
# Interaction Database Model
# -------------------------

class InteractionCreate(BaseModel):
    doctor_id: int
    interaction_date: date
    interaction_notes: str
    summary: str
    sentiment: str
    follow_up: str


class InteractionResponse(InteractionCreate):
    id: int

    class Config:
        from_attributes = True


# -------------------------
# AI Assistant
# -------------------------

class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str