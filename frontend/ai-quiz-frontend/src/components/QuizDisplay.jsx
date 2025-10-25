import React from "react";

export default function QuizDisplay({ quiz }) {
  if (!quiz) return <p>No quiz available.</p>;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">{quiz.title}</h2>
        <a
          href={quiz.source_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline text-sm"
        >
          {quiz.source_url}
        </a>
        <p className="mt-2">{quiz.summary}</p>
      </div>

      <div className="space-y-4">
        {quiz.questions.map((q) => (
          <div key={q.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-semibold">Q{q.id}. {q.question}</p>
            {q.choices && (
              <ul className="list-disc ml-5 mt-2">
                {q.choices.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-sm">
              <strong>Answer:</strong> {q.answer}
            </p>
            {q.explanation && (
              <p className="text-sm text-gray-600 italic mt-1">{q.explanation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
