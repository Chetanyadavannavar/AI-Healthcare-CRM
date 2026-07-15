from fastapi import APIRouter
from app.schemas import ChatRequest, ChatResponse

from app.agents.assistant_agent import ask_crm_agent

router = APIRouter(
    prefix="/assistant",
    tags=["AI Assistant"]
)


@router.post(
    "/chat",
    response_model=ChatResponse
)
def chat(request: ChatRequest):

    answer = ask_crm_agent(
        request.message
    )

    return ChatResponse(
        reply=answer
    )