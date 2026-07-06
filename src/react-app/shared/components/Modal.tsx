import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { Button } from '@/shared/components/Button'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  className,
}: ModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseRef.current()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const titleInput = panelRef.current?.querySelector<HTMLElement>('#todo-title')
      const focusTarget =
        titleInput ??
        panelRef.current?.querySelector<HTMLElement>(
          'input, textarea, button, [href], [tabindex]:not([tabindex="-1"])',
        )
      focusTarget?.focus()
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-black/72"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'relative z-10 w-full max-w-md rounded-lg border border-hairline bg-surface-1 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]',
          className,
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="text-[22px] font-medium tracking-[-0.4px] text-ink"
          >
            {title}
          </h2>
          <Button
            variant="tertiary"
            size="sm"
            aria-label="Close"
            className="shrink-0 px-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <div>{children}</div>
        {footer ? <div className="mt-6 flex justify-end gap-3">{footer}</div> : null}
      </div>
    </div>
  )
}
