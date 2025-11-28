// /frontend/context/ToastContext.js (NEW FILE)
'use client';

import Toast from '@/components/Toast';
import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

// Generates a unique ID for the toast
let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Function to add a new toast
  const addToast = useCallback((message, type = 'default') => {
    const id = ++toastId;
    const newToast = { id, message, type };

    // Add the toast
    setToasts((prev) => [...prev, newToast]);

    // Automatically remove the toast after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);

    return id;
  }, []);

  // Function to remove a toast
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast Container - fixed position in the bottom right */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};