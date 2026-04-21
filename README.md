# AutoStream AI – Social-to-Lead Agentic Workflow

**Author:** Ashish Kumar Nayak

---

## Project Overview

AutoStream AI is a GenAI-powered conversational agent designed to convert user interactions into qualified leads.

It simulates a real-world SaaS assistant for an automated video editing platform. The system intelligently understands user intent, retrieves relevant product information using Retrieval-Augmented Generation (RAG), and captures high-intent users through a structured conversational workflow.

---

## Key Features

* LLM-powered intent detection using Groq (LLaMA 3.3)
* Retrieval-Augmented Generation using FAISS vector database
* Context-aware responses from a knowledge base
* High-intent user detection
* Automated lead capture (Name, Email, Platform)
* Flask-based backend with REST API
* Interactive chat UI

---

## Tech Stack

* LLM: Groq (LLaMA 3.3)
* Backend: Flask
* Frontend: HTML, CSS, JavaScript
* Vector Store: FAISS
* Architecture: Modular agent-based design

---

## Architecture

User → Chat UI → Flask API → Agent
→ Intent Detection → RAG → Response Generation
→ Lead Capture → Output

---

## Project Structure

```
AutoStream-AI-Agent/
│
├── app.py
├── requirements.txt
├── README.md
│
├── data/
│   └── knowledge_base.json
│
├── src/
│   ├── agent.py
│   ├── intent.py
│   ├── rag.py
│   ├── lead_capture.py
│
├── templates/
│   └── index.html
│
├── vectorstore/
│   ├── index.faiss
│   └── index.pkl
│
├── notebooks/
│   └── Social_to_Lead_Agentic_Workflow.ipynb
│
├── demo/
│   └── demo_video.mp4
```

---

## How to Run

1. Clone the repository

```
git clone https://github.com/Ashish-nayakk/AutoStream-AI-Agent.git
cd AutoStream-AI-Agent
```

2. Install dependencies

```
pip install -r requirements.txt
```

3. Set your Groq API key

```
export GROQ_API_KEY=your_api_key
```

(For Windows PowerShell)

```
setx GROQ_API_KEY "your_api_key"
```

4. Run the application

```
python app.py
```

5. Open in browser

```
http://localhost:5000
```

---

## Example Queries

* What are your pricing plans?
* What features are included in Pro plan?
* I want to try your product

---

## Lead Capture Flow

When a high-intent user is detected, the system collects:

* Name
* Email
* Platform (YouTube, Instagram, etc.)

The lead is then processed using a mock capture function.

---

## WhatsApp Integration (Concept)

The system can be integrated with WhatsApp using webhook-based APIs such as Twilio:

* Incoming messages are sent to a Flask endpoint
* The agent processes the message
* The response is returned via WhatsApp API

---

## Demo

Add your demo video link here:
[Demo Video Link](https://drive.google.com/file/d/1VC-NT5ZkIRudWhfdmXquhTkxAM4kdoXP/view?usp=sharing)]

---

## Outcome

This project demonstrates:

* Conversational AI system design
* Integration of LLMs with backend systems
* Retrieval-Augmented Generation
* Lead generation automation
