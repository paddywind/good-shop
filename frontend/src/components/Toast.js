// /frontend/components/Toast.js
'use client';

import React from 'react';

// Renders a single toast notification
export default function Toast({ message, type, onClose }) {
  let bgColor = '';

  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    default:
      bgColor = 'bg-gray-700';
  }

  return (
    <div
      className={`relative p-4 rounded-lg shadow-xl text-white font-semibold transition-all duration-300 transform translate-x-0 m-2 ${bgColor}`}
      role="alert"
    >
      <p>{message}</p>
      <button
        onClick={onClose}
        className="absolute top-1 right-1 text-white opacity-80 hover:opacity-100 transition"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
}