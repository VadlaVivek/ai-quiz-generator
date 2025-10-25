import os, json, re
from dotenv import load_dotenv
from models import QuizOutput
import os, json, re
from dotenv import load_dotenv
from models import QuizOutput
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain.output_parsers import PydanticOutputParser
from langchain_google_genai import GoogleGenerativeAI

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

def generate_quiz(title: str, url: str, text: str):
    parser = PydanticOutputParser(pydantic_object=QuizOutput)

    prompt = PromptTemplate(
        template=(
            "You are an AI that reads a Wikipedia article and creates a quiz.\n\n"
            "Article title: {title}\n"
            "Source URL: {url}\n\n"
            "Article text:\n{text}\n\n"
            "Generate a JSON strictly matching the following schema:\n{format_instructions}\n"
            "The quiz must have:\n"
            "- 1 short summary\n"
            "- 5 to 10 questions with fields: id, question, type, choices (if mcq), answer, explanation."
        ),
        input_variables=["title", "url", "text"],
        partial_variables={"format_instructions": parser.get_format_instructions()}
    )

    llm = GoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=GEMINI_API_KEY)
    chain = LLMChain(prompt=prompt, llm=llm)

    raw_output = chain.run({"title": title, "url": url, "text": text})

    try:
        result = parser.parse(raw_output)
        return json.loads(result.json())
    except Exception:
        m = re.search(r"\{.*\}", raw_output, re.S)
        if m:
            return json.loads(m.group(0))
        raise
