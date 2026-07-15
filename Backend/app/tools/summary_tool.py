from app.services.groq_service import ask_groq


def summarize_interaction(interaction: str) -> str:

    prompt = f"""
You are an expert pharmaceutical CRM assistant.

Summarize the following doctor interaction in 3-5 concise sentences.

Interaction:
{interaction}

Summary:
"""

    return ask_groq(prompt)