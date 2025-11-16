import React, { useState, useEffect } from "react";
import { getHistory, getQuiz, deleteQuiz } from "../services/api";
import Modal from "../components/Modal";
import QuizDisplay from "../components/QuizDisplay";

export default function HistoryTab() {
  const [history, setHistory] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getHistory();
      setHistory(data);
    })();
  }, []);

  async function viewQuiz(id) {
    const quiz = await getQuiz(id);
    setSelectedQuiz(quiz.quiz);
    setShowModal(true);
  }

  async function handleDelete(id, event) {
    event.stopPropagation(); // Prevent row click
    if (!window.confirm("Are you sure you want to delete this quiz?")) {
      return;
    }
    
    setDeleting(id);
    try {
      await deleteQuiz(id);
      // Remove from local state
      setHistory(history.filter(h => h.id !== id));
    } catch (error) {
      alert("Failed to delete quiz: " + error.message);
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">URL</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {history.map((h) => (
            <tr key={h.id} className="border-t">
              <td className="p-2 border">{h.id}</td>
              <td className="p-2 border">{h.title}</td>
              <td className="p-2 border text-sm">
                <a
                  href={h.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Link
                </a>
              </td>
              <td className="p-2 border">{new Date(h.date_generated).toLocaleString()}</td>
              <td className="p-2 border">
                <button
                  onClick={() => viewQuiz(h.id)}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  View
                </button>
                <button
                  onClick={(e) => handleDelete(h.id, e)}
                  disabled={deleting === h.id}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2 disabled:opacity-50"
                >
                  {deleting === h.id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedQuiz && (
        <Modal onClose={() => setShowModal(false)}>
          <QuizDisplay quiz={selectedQuiz} />
        </Modal>
      )}
    </div>
  );
}
