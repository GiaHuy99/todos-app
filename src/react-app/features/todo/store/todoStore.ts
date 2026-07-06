import { create } from 'zustand'
import { todoApi } from '@/features/todo/services/todoApi'
import type {
  CreateTodoPayload,
  Todo,
  TodoFilter,
  UpdateTodoPayload,
} from '@/features/todo/types/todo.types'

const PAGE_SIZE = 10

function mapFilterToCompleted(filter: TodoFilter): boolean | undefined {
  switch (filter) {
    case 'completed':
      return true
    case 'incomplete':
      return false
    default:
      return undefined
  }
}

interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null
  search: string
  filter: TodoFilter
  page: number
  totalPages: number
  totalElements: number
}

interface TodoActions {
  setSearch: (value: string) => void
  setFilter: (value: TodoFilter) => void
  setPage: (page: number) => void
  clearFilters: () => void
  fetchTodos: (debouncedSearch: string) => Promise<void>
  createTodo: (payload: CreateTodoPayload) => Promise<boolean>
  updateTodo: (id: number, payload: UpdateTodoPayload) => Promise<boolean>
  toggleTodoComplete: (
    id: number,
    completed: boolean,
    debouncedSearch: string,
  ) => Promise<boolean>
  deleteTodo: (id: number, debouncedSearch: string) => Promise<boolean>
}

export type TodoStore = TodoState & TodoActions

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: true,
  error: null,
  search: '',
  filter: 'all',
  page: 0,
  totalPages: 0,
  totalElements: 0,

  setSearch: (value) => set({ search: value, page: 0 }),

  setFilter: (value) => set({ filter: value, page: 0 }),

  setPage: (page) => set({ page }),

  clearFilters: () => set({ search: '', filter: 'all', page: 0 }),

  fetchTodos: async (debouncedSearch) => {
    const { page, filter } = get()

    set({ loading: true, error: null })

    try {
      const response = await todoApi.getAll({
        page,
        size: PAGE_SIZE,
        completed: mapFilterToCompleted(filter),
        search: debouncedSearch.trim() || undefined,
      })

      set({
        todos: response.content,
        page: response.page,
        totalPages: response.totalPages,
        totalElements: response.totalElements,
        loading: false,
      })
    } catch {
      set({
        error: 'Failed to load todos. Check your connection and try again.',
        loading: false,
      })
    }
  },

  createTodo: async (payload) => {
    try {
      await todoApi.create(payload)
      set({ page: 0 })
      return true
    } catch {
      return false
    }
  },

  updateTodo: async (id, payload) => {
    try {
      const updated = await todoApi.update(id, payload)
      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updated : todo)),
      }))
      return true
    } catch {
      return false
    }
  },

  toggleTodoComplete: async (id, completed, debouncedSearch) => {
    const previous = get().todos

    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo,
      ),
    }))

    try {
      await todoApi.toggleComplete(id, completed)
      await get().fetchTodos(debouncedSearch)
      return true
    } catch {
      set({ todos: previous })
      return false
    }
  },

  deleteTodo: async (id, debouncedSearch) => {
    const { todos, page } = get()

    try {
      await todoApi.remove(id)

      if (todos.length === 1 && page > 0) {
        set({ page: page - 1 })
      } else {
        await get().fetchTodos(debouncedSearch)
      }

      return true
    } catch {
      return false
    }
  },
}))
