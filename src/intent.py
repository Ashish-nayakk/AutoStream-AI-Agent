from groq import Groq
import os

groq_client = Groq(api_key=os.environ["GROQ_API_KEY"])
MODEL = "llama-3.3-70b-versatile"

INTENT_SYSTEM = (
    "You are an intent classifier.\n"
    "Classify into ONE label:\n"
    "greeting\n"
    "inquiry\n"
    "high_intent\n"
    "Reply ONLY with label."
)

def classify_intent(text: str) -> str:
    try:
        res = groq_client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": INTENT_SYSTEM},
                {"role": "user", "content": text}
            ],
            temperature=0
        )
        label = res.choices[0].message.content.strip().lower()

        if label in ["greeting", "inquiry", "high_intent"]:
            return label
        return "inquiry"

    except:
        # fallback
        if any(x in text.lower() for x in ["hi", "hello"]):
            return "greeting"
        if any(x in text.lower() for x in ["buy", "price", "sign"]):
            return "high_intent"
        return "inquiry"