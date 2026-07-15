from sqlalchemy import Column, Integer, String, Date, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database import Base


class Doctor(Base):

    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    hospital = Column(String(150), nullable=False)

    specialization = Column(String(100), nullable=False)

    phone = Column(String(20))

    email = Column(String(100))

    address = Column(String(255))

    availability = Column(String(100))

    hospital_phone = Column(String(20))

    emergency_phone = Column(String(20))

    interactions = relationship(
        "Interaction",
        back_populates="doctor",
        cascade="all, delete-orphan"
    )


class Interaction(Base):

    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    doctor_id = Column(
        Integer,
        ForeignKey("doctors.id"),
        nullable=False
    )

    interaction_date = Column(Date, nullable=False)

    interaction_notes = Column(Text, nullable=False)

    summary = Column(Text)

    sentiment = Column(String(30))

    follow_up = Column(Text)

    doctor = relationship(
        "Doctor",
        back_populates="interactions"
    )