import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def scrape_wikipedia(url: str):
    parsed = urlparse(url)
    if not parsed.scheme.startswith("http"):
        raise ValueError("Invalid URL format")

    response = requests.get(url, headers={"User-Agent": "ai-quiz-generator/1.0"})
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    title_el = soup.find(id="firstHeading")
    title = title_el.get_text().strip() if title_el else "Untitled Article"

    content = soup.find(id="mw-content-text")
    if not content:
        raise ValueError("Main content not found in the page")

   
    for tag in content(["table", "sup", "figure", "script", "style", "aside"]):
        tag.decompose()

    paragraphs = [p.get_text().strip() for p in content.find_all("p") if p.get_text().strip()]
    cleaned_text = "\n\n".join(paragraphs)

    
    MAX_CHARS = 50000
    if len(cleaned_text) > MAX_CHARS:
        cleaned_text = cleaned_text[:MAX_CHARS] + "\n\n[Truncated for brevity]"

    return {"title": title, "text": cleaned_text}
