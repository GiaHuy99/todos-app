import type { ReactNode } from 'react'
import { Modal } from '@/shared/components/Modal'
import { Button } from '@/shared/components/Button'

export interface DialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  loading?: boolean
}

export function Dialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  loading = false,
}: DialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      className="max-w-sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
            loadingText="Deleting…"
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="space-y-2 text-sm text-ink-muted">{description}</div>
    </Modal>
  )
}
