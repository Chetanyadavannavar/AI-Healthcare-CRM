from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import SessionLocal
from app.models import Doctor, Interaction


def dashboard_stats():
    db: Session = SessionLocal()

    try:

        doctors = db.query(Doctor).count()

        interactions = db.query(Interaction).count()

        positive = (
            db.query(Interaction)
            .filter(Interaction.sentiment == "Positive")
            .count()
        )

        neutral = (
            db.query(Interaction)
            .filter(Interaction.sentiment == "Neutral")
            .count()
        )

        negative = (
            db.query(Interaction)
            .filter(Interaction.sentiment == "Negative")
            .count()
        )

        return {
            "doctors": doctors,
            "interactions": interactions,
            "positive": positive,
            "neutral": neutral,
            "negative": negative
        }

    finally:
        db.close()


def top_doctors():
    db: Session = SessionLocal()

    try:

        result = (
            db.query(
                Doctor.name,
                func.count(Interaction.id).label("meetings")
            )
            .join(Interaction)
            .group_by(Doctor.id)
            .order_by(func.count(Interaction.id).desc())
            .limit(5)
            .all()
        )

        return [
            {
                "name": doctor.name,
                "meetings": doctor.meetings
            }
            for doctor in result
        ]

    finally:
        db.close()