from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.routers import (
    doctor,
    interaction,
    dashboard,
    assistant,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Healthcare CRM",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(doctor.router)
app.include_router(interaction.router)
app.include_router(dashboard.router)
app.include_router(assistant.router)


@app.get("/")
def home():

    return {
        "message": "🚀 AI Healthcare CRM Backend Running"
    }