from src.intent import classify_intent
from src.rag import retrieve_context
from src.lead_capture import update_lead

def initial_state():
    return {
        "messages": [],
        "lead_name": None,
        "lead_email": None,
        "lead_platform": None,
        "lead_captured": False
    }

def generate_response(user_input, context):
    return f"📊 Based on our product:\n{context}"

def chat(user_input, session):
    session["messages"].append(user_input)

    intent = classify_intent(user_input)

    # 🔥 Lead capture flow
    if intent == "high_intent" or session.get("lead_name"):
        lead_response = update_lead(session, user_input)
        if lead_response:
            return lead_response, session

    # 🔥 RAG response
    context = retrieve_context(user_input)
    response = generate_response(user_input, context)

    return response, session