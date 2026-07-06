import { AlertCircle, ListTodo } from 'lucide-react'
import { EmptyState } from '@/shared/components/EmptyState'
import { Button } from '@/shared/components/Button'
import { Spinner } from '@/shared/components/Spinner'
import { TodoCard } from '@/features/todo/components/TodoCard'
import type { Todo } from '@/features/todo/types/todo.types'

export interface TodoListProps {
  todos: Todo[]
  totalElements: number
  hasActiveFilters: boolean
  loading: boolean
  error: string | null
  onRetry: () => void
  onClearFilters: () => void
  onCreateClick: () => void
  onToggleComplete: (id: number, completed: boolean) => void
  onEdit: (todo: Todo) => void
  onDelete: (todo: Todo) => void
}

export function TodoList({
  todos,
  totalElements,
  hasActiveFilters,
  loading,
  error,
  onRetry,
  onClearFilters,
  onCreateClick,
  onToggleComplete,
  onEdit,
  onDelete,
}: TodoListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Spinner size="lg" label="Loading todos" />
        <p className="mt-4 text-sm text-ink-subtle">Loading todos…</p>
      </div>
    )
  }

  if (error) {
    return (
      <EmptyState
        icon={<AlertCircle className="h-6 w-6" aria-hidden="true" />}
        title="Failed to load todos"
        description={error}
        action={
          <Button variant="secondary" onClick={onRetry}>
            Retry
          </Button>
        }
      />
    )
  }

  if (!hasActiveFilters && totalElements === 0) {
    return (
      <EmptyState
        icon={<ListTodo className="h-6 w-6" aria-hidden="true" />}
        title="No todos yet"
        description="Create your first todo to get started."
        action={
          <Button onClick={onCreateClick}>Add Todo</Button>
        }
      />
    )
  }

  if (todos.length === 0) {
    return (
      <EmptyState
        icon={<ListTodo className="h-6 w-6" aria-hidden="true" />}
        title="No matching todos"
        description="Try adjusting your search or filter."
        action={
          <Button variant="tertiary" onClick={onClearFilters}>
            Clear filters
          </Button>
        }
      />
    )
  }

  return (
    <ul
      aria-live="polite"
      className="flex flex-col gap-3"
    >
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoCard
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  )
}
