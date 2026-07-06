import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  AlertCircle,
  Check,
  Info,
  Trash2,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import {
  ToastContext,
  type ToastItem,
  type ToastVariant,
} from '@/shared/hooks/useToast'

export type { ToastVariant }

const AUTO_DISMISS_MS = 4000

const toastVariantStyles: Record<
  ToastVariant,
  { container: string; icon: string; Icon: LucideIcon }
> = {
  success: {
    container:
      'border-success/30 bg-success/10 border-l-success shadow-[inset_0_1px_0_0_rgba(39,166,68,0.08)]',
    icon: 'text-success',
    Icon: Check,
  },
  info: {
    container:
      'border-primary/30 bg-primary/10 border-l-primary shadow-[inset_0_1px_0_0_rgba(94,106,210,0.08)]',
    icon: 'text-primary',
    Icon: Info,
  },
  neutral: {
    container:
      'border-hairline-strong bg-surface-2 border-l-ink-muted shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]',
    icon: 'text-ink-muted',
    Icon: Trash2,
  },
  error: {
    container:
      'border-error/30 bg-error/10 border-l-error shadow-[inset_0_1px_0_0_rgba(229,72,77,0.08)]',
    icon: 'text-error',
    Icon: AlertCircle,
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = crypto.randomUUID()
      setToasts((current) => [...current, { id, message, variant }])

      window.setTimeout(() => {
        removeToast(id)
      }, AUTO_DISMISS_MS)
    },
    [removeToast],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed bottom-4 left-4 right-4 z-[70] flex flex-col gap-2 sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-sm"
      >
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            toast={toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

interface ToastNotificationProps {
  toast: ToastItem
  onDismiss: () => void
}

function ToastNotification({ toast, onDismiss }: ToastNotificationProps) {
  const styles = toastVariantStyles[toast.variant]
  const EventIcon = styles.Icon

  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto flex items-start gap-3 rounded-lg border border-l-[3px] px-4 py-3 text-sm text-ink motion-safe:animate-in motion-safe:slide-in-from-bottom-2',
        styles.container,
      )}
    >
      <span className={cn('mt-0.5 shrink-0', styles.icon)} aria-hidden="true">
        <EventIcon className="h-4 w-4" />
      </span>
      <p className="flex-1">{toast.message}</p>
      <button
        type="button"
        aria-label="Dismiss notification"
        className="shrink-0 text-ink-subtle transition-colors hover:text-ink"
        onClick={onDismiss}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
