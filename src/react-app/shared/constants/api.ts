export const API_BASE_URL = '/api'

export const TODO_ENDPOINTS = {
  list: `${API_BASE_URL}/todos`,
  detail: (id: number) => `${API_BASE_URL}/todos/${id}`,
} as const
