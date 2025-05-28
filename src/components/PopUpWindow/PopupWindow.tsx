import React from "react";

type PopupWindowProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function PopUpWindow({ open, onClose, children }: PopupWindowProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Fondo negro translúcido */}
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      {/* Ventana modal */}
      <div className="relative bg-white rounded-lg shadow-lg z-10 w-full max-w-md mx-auto p-6">
        {/* Botón cerrar */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 6 6 18M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}