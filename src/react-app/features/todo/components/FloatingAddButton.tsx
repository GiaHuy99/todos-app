import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/Button'

export interface FloatingAddButtonProps {
  onClick: () => void
}

export function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <Button
      type="button"
      aria-label="Add todo"
      className="fixed bottom-6 right-4 z-30 h-14 min-h-14 w-14 rounded-full p-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] sm:bottom-8 sm:right-8"
      onClick={onClick}
    >
      <Plus className="h-6 w-6" aria-hidden="true" />
    </Button>
  )
}
