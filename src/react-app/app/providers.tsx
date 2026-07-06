import type { ReactNode } from 'react'
import { ToastProvider } from '@/shared/components/ToastProvider'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <ToastProvider>{children}</ToastProvider>
}
