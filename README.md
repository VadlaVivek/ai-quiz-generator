#  AI Quiz Generator

An **AI-powered web application** that generates multiple-choice quizzes from any URL or online article using **Large Language Models (LLMs)**.  
Built with **FastAPI**, **LangChain**, **React**, and **TailwindCSS** — this project allows users to create, take, and track quizzes effortlessly.

---

##  Overview

The AI Quiz Generator scrapes web content from a provided URL and uses an AI model (e.g., Google Gemini) to automatically create quiz questions, options, correct answers, and explanations.

Users can:
- Generate quizzes from URLs
- Attempt them interactively in a modern UI
- Review their answers and explanations
- View their quiz history (saved in the database)

---


---

##  Features

- Generate quizzes instantly from any web URL  
- Multiple-choice questions with explanations  
- Interactive blue-themed UI (TailwindCSS)  
- Instant quiz scoring  
- Persistent quiz history (via database)
- View detailed answers and explanations  
- Clean React + FastAPI integration  

---

🔹  Backend Setup (FastAPI)

# Create Virtual Environment
- cd backend
- python -m venv venv
- venv\Scripts\activate

# Install Dependencies
- pip install -r requirements.txt

# Run the Backend Server
- uvicorn main:app --reload --port 8000

---

🔹  Frontend Setup (React + Vite + TailwindCSS)

- cd ../frontend/ai-quiz-frontend
- npm install
- npm run dev

# How It Works

- User enters a URL in the frontend.

- FastAPI sends the page text to the LangChain + Google Gemini model.

- The AI generates questions, multiple-choice options, correct answers, and     explanations.

- The quiz displays interactively with selectable options.

- Upon submission, the score and explanations appear.

- The quiz results are saved into the database.

- Users can review their quiz history anytime.


#  Tech Stack

| Layer    | Technology                |
| -------- | ------------------------- |
| Frontend | React (Vite)              |
| Styling  | Tailwind CSS              |
| Backend  | FastAPI                   |
| Database | SQLite / PostgreSQL       |
| AI / LLM | LangChain + Google Gemini |
| Language | Python 3.12+, Node.js 18+ |


# Author

Developer: Vadla Vivek
Version: 1.0.0
Frameworks: FastAPI • React • LangChain
Date: October 2025