import { createContext, useContext } from 'react'

export type ToastVariant = 'success' | 'info' | 'neutral' | 'error'

export interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

export interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
