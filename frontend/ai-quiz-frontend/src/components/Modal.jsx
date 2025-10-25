import React from "react";

export default function Modal({show, onClose, children}) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className="overflow-y-auto max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
