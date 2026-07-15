from datetime import date

from langchain_core.tools import tool
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Doctor, Interaction


@tool
def get_all_interactions() -> str:
    """
    Returns all interactions.
    """

    db: Session = SessionLocal()

    try:

        interactions = (
            db.query(Interaction)
            .join(Doctor)
            .order_by(Interaction.interaction_date.desc())
            .all()
        )

        if not interactions:
            return "No interactions found."

        result = []

        for item in interactions:

            result.append(
                f"""
Doctor : {item.doctor.name}

Date : {item.interaction_date}

Sentiment : {item.sentiment}

Summary : {item.summary}
"""
            )

        return "\n----------------------\n".join(result)

    finally:

        db.close()


@tool
def interaction_count() -> str:
    """
    Returns total interactions.
    """

    db: Session = SessionLocal()

    try:

        return f"Total Interactions : {db.query(Interaction).count()}"

    finally:

        db.close()


@tool
def today_interactions() -> str:
    """
    Returns today's interactions.
    """

    db: Session = SessionLocal()

    try:

        interactions = (
            db.query(Interaction)
            .filter(
                Interaction.interaction_date == date.today()
            )
            .all()
        )

        if not interactions:
            return "No interactions today."

        return f"Today's Interactions : {len(interactions)}"

    finally:

        db.close()