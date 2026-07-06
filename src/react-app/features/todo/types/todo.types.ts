export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}

export interface TodoQueryParams {
  page?: number
  size?: number
  completed?: boolean
  search?: string
}

export interface CreateTodoPayload {
  title: string
  description: string
}

export interface UpdateTodoPayload {
  title?: string
  description?: string
  completed?: boolean
}

export type TodoFilter = 'all' | 'completed' | 'incomplete'

export interface TodoFormValues {
  title: string
  description: string
}

export interface TodoFormErrors {
  title?: string
  description?: string
}
