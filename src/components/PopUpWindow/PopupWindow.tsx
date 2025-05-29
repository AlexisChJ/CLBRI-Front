import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Red_Hat_Display } from "next/font/google"

const redHat = Red_Hat_Display({
  weight: ["800"],
  subsets: ["latin"],
  preload: true,
})

type PopupWindowProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  width?: string
}

export default function PopUpWindow({ open, onClose, children, width }: PopupWindowProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Fondo negro translúcido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          />

          {/* Ventana modal con tipografía Red Hat */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`${redHat.className} relative bg-white rounded-lg shadow-lg z-10 w-full ${width ?? "max-w-md"} mx-auto p-6`}
          >
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
