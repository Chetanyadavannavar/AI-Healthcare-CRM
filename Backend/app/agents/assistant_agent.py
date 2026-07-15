from langgraph.prebuilt import create_react_agent

from app.services.groq_service import llm

# Doctor Tools
from app.tools.doctor_tool import (
    get_all_doctors,
    search_doctor,
    doctor_count,
    doctor_specialization,
    get_doctor_details,
)

# Interaction Tools
from app.tools.interaction_tool import (
    get_all_interactions,
    interaction_count,
    today_interactions,
)

tools = [
    # Doctor
    get_all_doctors,
    search_doctor,
    doctor_count,
    doctor_specialization,
    get_doctor_details,

    # Interaction
    get_all_interactions,
    interaction_count,
    today_interactions,
]

SYSTEM_PROMPT = """
You are an AI Healthcare CRM Assistant.

You help Medical Representatives manage doctors and interactions.

You can:

- Show doctors
- Search doctors
- Show doctor details
- Show today's interactions
- Show total interactions

Always use the available tools.

Never invent data.
"""

agent = create_react_agent(
    model=llm,
    tools=tools,
    prompt=SYSTEM_PROMPT,
)


def ask_crm_agent(question: str):

    response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": question,
                }
            ]
        }
    )

    return response["messages"][-1].content