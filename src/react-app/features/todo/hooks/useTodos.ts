import { useCallback, useEffect } from 'react'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useToast } from '@/shared/hooks/useToast'
import { useTodoStore } from '@/features/todo/store/todoStore'
import type {
  CreateTodoPayload,
  Todo,
  TodoFilter,
  UpdateTodoPayload,
} from '@/features/todo/types/todo.types'

interface UseTodosState {
  todos: Todo[]
  loading: boolean
  error: string | null
  search: string
  filter: TodoFilter
  page: number
  totalPages: number
  totalElements: number
  hasActiveFilters: boolean
  setSearch: (value: string) => void
  setFilter: (value: TodoFilter) => void
  setPage: (page: number) => void
  clearFilters: () => void
  refetch: () => Promise<void>
  createTodo: (payload: CreateTodoPayload) => Promise<boolean>
  updateTodo: (id: number, payload: UpdateTodoPayload) => Promise<boolean>
  toggleTodoComplete: (id: number, completed: boolean) => Promise<boolean>
  deleteTodo: (id: number) => Promise<boolean>
}

export function useTodos(): UseTodosState {
  const { showToast } = useToast()

  const todos = useTodoStore((state) => state.todos)
  const loading = useTodoStore((state) => state.loading)
  const error = useTodoStore((state) => state.error)
  const search = useTodoStore((state) => state.search)
  const filter = useTodoStore((state) => state.filter)
  const page = useTodoStore((state) => state.page)
  const totalPages = useTodoStore((state) => state.totalPages)
  const totalElements = useTodoStore((state) => state.totalElements)

  const setSearch = useTodoStore((state) => state.setSearch)
  const setFilter = useTodoStore((state) => state.setFilter)
  const setPage = useTodoStore((state) => state.setPage)
  const clearFilters = useTodoStore((state) => state.clearFilters)
  const fetchTodos = useTodoStore((state) => state.fetchTodos)
  const storeCreateTodo = useTodoStore((state) => state.createTodo)
  const storeUpdateTodo = useTodoStore((state) => state.updateTodo)
  const storeToggleTodoComplete = useTodoStore(
    (state) => state.toggleTodoComplete,
  )
  const storeDeleteTodo = useTodoStore((state) => state.deleteTodo)

  const debouncedSearch = useDebounce(search)
  const hasActiveFilters = search.trim().length > 0 || filter !== 'all'

  useEffect(() => {
    void fetchTodos(debouncedSearch)
  }, [debouncedSearch, filter, page, fetchTodos])

  const refetch = useCallback(async () => {
    await fetchTodos(debouncedSearch)
  }, [debouncedSearch, fetchTodos])

  const createTodo = useCallback(
    async (payload: CreateTodoPayload) => {
      const success = await storeCreateTodo(payload)

      if (success) {
        await fetchTodos(debouncedSearch)
        showToast('Todo created.', 'success')
      } else {
        showToast('Something went wrong. Please try again.', 'error')
      }

      return success
    },
    [debouncedSearch, fetchTodos, showToast, storeCreateTodo],
  )

  const updateTodo = useCallback(
    async (id: number, payload: UpdateTodoPayload) => {
      const success = await storeUpdateTodo(id, payload)

      if (success) {
        showToast('Todo updated.', 'info')
      } else {
        showToast('Something went wrong. Please try again.', 'error')
      }

      return success
    },
    [showToast, storeUpdateTodo],
  )

  const toggleTodoComplete = useCallback(
    async (id: number, completed: boolean) => {
      const success = await storeToggleTodoComplete(
        id,
        completed,
        debouncedSearch,
      )

      if (success) {
        showToast(
          completed ? 'Todo marked complete.' : 'Todo marked incomplete.',
          completed ? 'success' : 'info',
        )
      } else {
        showToast('Something went wrong. Please try again.', 'error')
      }

      return success
    },
    [debouncedSearch, showToast, storeToggleTodoComplete],
  )

  const deleteTodo = useCallback(
    async (id: number) => {
      const success = await storeDeleteTodo(id, debouncedSearch)

      if (success) {
        showToast('Todo deleted.', 'neutral')
      } else {
        showToast('Something went wrong. Please try again.', 'error')
      }

      return success
    },
    [debouncedSearch, showToast, storeDeleteTodo],
  )

  return {
    todos,
    loading,
    error,
    search,
    filter,
    page,
    totalPages,
    totalElements,
    hasActiveFilters,
    setSearch,
    setFilter,
    setPage,
    clearFilters,
    refetch,
    createTodo,
    updateTodo,
    toggleTodoComplete,
    deleteTodo,
  }
}
