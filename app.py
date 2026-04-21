from flask import Flask, request, jsonify, render_template
import os

# 🔹 Import your logic (you can later modularize into src/)
# For now, keep it simple

# --- TEMP LOGIC (replace with your actual imports later) ---
def initial_state():
    return {
        'messages': [],
        'lead_name': None,
        'lead_email': None,
        'lead_platform': None,
        'lead_captured': False
    }

def chat(user_input, session):
    # Replace this with your real agent_graph logic
    response = f"🤖 Response: {user_input}"
    return response, session
# ---------------------------------------------------------

app = Flask(__name__, template_folder="templates")

# Global session
session_data = initial_state()

# 🔥 UI Route
@app.route("/")
def home():
    return render_template("index.html")

# 🔥 Chat API
@app.route("/chat", methods=["POST"])
def chat_api():
    global session_data

    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        reply, session_data = chat(user_message, session_data)
        return jsonify({"response": reply})
    except Exception as e:
        return jsonify({"error": str(e)})

# 🔥 Reset API
@app.route("/reset", methods=["POST"])
def reset_api():
    global session_data
    session_data = initial_state()
    return jsonify({"status": "reset"})

# 🔥 Run
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)