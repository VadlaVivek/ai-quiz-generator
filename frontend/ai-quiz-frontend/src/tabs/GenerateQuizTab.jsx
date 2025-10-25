import React, { useState } from "react";
import { generateQuiz } from "../services/api";
import QuizDisplay from "../components/QuizDisplay";

export default function GenerateQuizTab() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!url || !url.includes("wikipedia.org")) {
      setError("Please enter a valid Wikipedia URL.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await generateQuiz(url);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Paste Wikipedia URL"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Generate
        </button>
      </form>

      {loading && <p className="text-gray-500">Generating quiz... please wait.</p>}
      {error && <p className="text-red-600">{error}</p>}
      {result && !loading && <QuizDisplay quiz={result.quiz} />}
    </div>
  );
}
