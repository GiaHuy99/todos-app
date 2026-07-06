import axios from 'axios'
import { TODO_ENDPOINTS } from '@/shared/constants/api'
import type {
  CreateTodoPayload,
  PageResponse,
  Todo,
  TodoQueryParams,
  UpdateTodoPayload,
} from '@/features/todo/types/todo.types'

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

export const todoApi = {
  getAll: async (params: TodoQueryParams = {}): Promise<PageResponse<Todo>> => {
    const response = await client.get<PageResponse<Todo>>(TODO_ENDPOINTS.list, {
      params,
    })
    return response.data
  },

  create: async (payload: CreateTodoPayload): Promise<Todo> => {
    const response = await client.post<Todo>(TODO_ENDPOINTS.list, payload)
    return response.data
  },

  update: async (id: number, payload: UpdateTodoPayload): Promise<Todo> => {
    const response = await client.put<Todo>(TODO_ENDPOINTS.detail(id), payload)
    return response.data
  },

  toggleComplete: async (id: number, completed: boolean): Promise<Todo> => {
    const response = await client.patch<Todo>(TODO_ENDPOINTS.detail(id), {
      completed,
    })
    return response.data
  },

  remove: async (id: number): Promise<void> => {
    await client.delete(TODO_ENDPOINTS.detail(id))
  },
}
