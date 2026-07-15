from app.services.groq_service import ask_groq


def recommend_followup(interaction: str) -> str:

    prompt = f"""
You are a pharmaceutical CRM assistant.

Based on the interaction below, suggest the next follow-up action in one or two sentences.

Interaction:
{interaction}

Follow-up:
"""

    return ask_groq(prompt)