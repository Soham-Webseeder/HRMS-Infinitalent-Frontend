import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-20">
        {/* Close button */}
        <button
          className="absolute top-4 right-3 text-gray-600  text-xl hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
