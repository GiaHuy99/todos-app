import type { TodoFilter } from '@/features/todo/types/todo.types'

export function getFilterLabel(filter: TodoFilter): string {
  switch (filter) {
    case 'completed':
      return 'Completed'
    case 'incomplete':
      return 'Incomplete'
    default:
      return 'All'
  }
}
