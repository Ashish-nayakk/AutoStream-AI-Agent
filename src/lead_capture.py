import re

def extract_email(text):
    match = re.search(r"\S+@\S+\.\S+", text)
    return match.group(0) if match else None

def update_lead(session, user_input):
    if not session.get("lead_name"):
        session["lead_name"] = user_input
        return "Nice to meet you! What's your email?"

    if not session.get("lead_email"):
        email = extract_email(user_input)
        if email:
            session["lead_email"] = email
            return "Got it! Which platform do you create content for?"

        return "Please enter a valid email."

    if not session.get("lead_platform"):
        session["lead_platform"] = user_input
        session["lead_captured"] = True
        return "🎉 Thanks! Our team will contact you soon."

    return None