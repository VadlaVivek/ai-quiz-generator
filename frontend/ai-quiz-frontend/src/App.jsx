import React, { useState } from "react";
import GenerateQuizTab from "./tabs/GenerateQuizTab";
import HistoryTab from "./tabs/HistoryTab";

export default function App() {
  const [tab, setTab] = useState("generate");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        AI Wiki Quiz Generator
      </h1>

      <div className="flex justify-center mb-6 gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            tab === "generate" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("generate")}
        >
          Generate Quiz
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            tab === "history" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("history")}
        >
          History
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 min-h-[400px]">
        {tab === "generate" && <GenerateQuizTab />}
        {tab === "history" && <HistoryTab />}
      </div>
    </div>
  );
}
