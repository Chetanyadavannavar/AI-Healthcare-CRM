from fastapi import APIRouter

from app.tools.dashboard_tool import (
    dashboard_stats,
    top_doctors,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def stats():

    return dashboard_stats()


@router.get("/top-doctors")
def doctors():

    return top_doctors()