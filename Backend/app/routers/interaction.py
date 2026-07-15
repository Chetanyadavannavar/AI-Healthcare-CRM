from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud
from app.schemas import (
    InteractionRequest,
    InteractionCreate
)

from app.tools.summary_tool import summarize_interaction
from app.tools.sentiment_tool import analyze_sentiment
from app.tools.followup_tool import recommend_followup

router = APIRouter(
    prefix="/interactions",
    tags=["Interactions"]
)


@router.post("/")
def create_interaction(
    request: InteractionRequest,
    db: Session = Depends(get_db)
):

    summary = summarize_interaction(
        request.interaction_notes
    )

    sentiment = analyze_sentiment(
        request.interaction_notes
    )

    follow_up = recommend_followup(
        request.interaction_notes
    )

    interaction = InteractionCreate(
        doctor_id=request.doctor_id,
        interaction_date=date.today(),
        interaction_notes=request.interaction_notes,
        summary=summary,
        sentiment=sentiment,
        follow_up=follow_up
    )

    saved = crud.create_interaction(
        db,
        interaction
    )

    return {
        "id": saved.id,
        "summary": summary,
        "sentiment": sentiment,
        "follow_up": follow_up
    }


@router.get("/")
def get_interactions(
    db: Session = Depends(get_db)
):

    return crud.get_all_interactions(db)