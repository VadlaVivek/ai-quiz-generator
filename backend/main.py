from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal, init_db, Quiz
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz
import json

init_db()
app = FastAPI(title="AI Wiki Quiz Generator")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLInput(BaseModel):
    url: str

@app.post("/generate_quiz")
def create_quiz(data: URLInput):
    db = SessionLocal()
    try:
        scraped = scrape_wikipedia(data.url)
        quiz_json = generate_quiz(scraped["title"], data.url, scraped["text"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    record = Quiz(
        url=data.url,
        title=scraped["title"],
        scraped_content=scraped["text"],
        full_quiz_data=json.dumps(quiz_json, ensure_ascii=False)
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return {
        "id": record.id,
        "title": record.title,
        "url": record.url,
        "date_generated": record.date_generated.isoformat(),
        "quiz": quiz_json
    }

@app.get("/history")
def get_history():
    db = SessionLocal()
    quizzes = db.query(Quiz).order_by(Quiz.date_generated.desc()).all()
    return [
        {"id": q.id, "title": q.title, "url": q.url, "date_generated": q.date_generated.isoformat()}
        for q in quizzes
    ]

@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int):
    db = SessionLocal()
    q = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return {
        "id": q.id,
        "title": q.title,
        "url": q.url,
        "date_generated": q.date_generated.isoformat(),
        "quiz": json.loads(q.full_quiz_data)
    }
