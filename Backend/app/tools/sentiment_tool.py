from app.services.groq_service import ask_groq

def analyze_sentiment(interaction: str) -> str:

    prompt = f"""
Analyze the sentiment of the doctor's interaction.

Return ONLY one word.

Positive
Neutral
Negative

Interaction:
{interaction}
"""

    result = ask_groq(prompt).strip()

    if "positive" in result.lower():
        return "Positive"

    if "negative" in result.lower():
        return "Negative"

    return "Neutral"