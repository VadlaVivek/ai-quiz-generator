from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class Question(BaseModel):
    id: int
    question: str
    type: str
    choices: Optional[List[str]] = None
    answer: str
    explanation: Optional[str] = None

class QuizOutput(BaseModel):
    title: str
    source_url: str
    summary: Optional[str]
    questions: List[Question]
    metadata: Optional[Dict[str, Any]] = None
