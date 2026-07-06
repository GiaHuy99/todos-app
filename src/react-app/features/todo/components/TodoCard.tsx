import { Check } from 'lucide-react'
import { Badge } from '@/shared/components/Badge'
import { Button } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { cn } from '@/shared/utils/cn'
import type { Todo } from '@/features/todo/types/todo.types'

export interface TodoCardProps {
  todo: Todo
  onToggleComplete: (id: number, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (todo: Todo) => void
}

export function TodoCard({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoCardProps) {
  return (
    <Card interactive>
      <div className="flex gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={todo.completed}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-focus/50',
            todo.completed
              ? 'border-primary bg-primary text-on-primary'
              : 'border-hairline-strong bg-surface-1 hover:border-primary',
          )}
          onClick={() => onToggleComplete(todo.id, !todo.completed)}
        >
          {todo.completed ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : null}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <h3
                className={cn(
                  'truncate text-[22px] font-medium tracking-[-0.4px]',
                  todo.completed ? 'text-ink-subtle line-through' : 'text-ink',
                )}
              >
                {todo.title}
              </h3>
              {todo.description ? (
                <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                  {todo.description}
                </p>
              ) : null}
            </div>

            <div className="flex shrink-0 gap-2 sm:ml-4">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onEdit(todo)}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="tertiary"
                size="sm"
                onClick={() => onDelete(todo)}
              >
                Delete
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <Badge variant={todo.completed ? 'success' : 'warning'}>
              {todo.completed ? 'Completed' : 'Incomplete'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  )
}
