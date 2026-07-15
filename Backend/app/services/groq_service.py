from langchain_groq import ChatGroq

from app.config import GROQ_API_KEY


llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=GROQ_API_KEY,
    temperature=0.2
)


def ask_groq(prompt: str) -> str:

    response = llm.invoke(prompt)

    return response.content