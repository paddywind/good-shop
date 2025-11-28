// /frontend/components/DeleteConfirmationModal.js (NEW FILE)
'use client';


export default function DeleteConfirmationModal({ isOpen, onClose, onConfirm, title }) {
  if (!isOpen) return null;

  return (
    // Overlay (Clicking outside closes the modal)
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      {/* Modal Content (Prevent click on content from closing modal) */}
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4 text-black">Confirm Deletion</h3>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete the blog post titled: `&quot;{title}&quot;`?
          This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
}