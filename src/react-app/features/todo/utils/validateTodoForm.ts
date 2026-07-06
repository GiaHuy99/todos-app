import type { TodoFormErrors, TodoFormValues } from '@/features/todo/types/todo.types'

const TITLE_MAX_LENGTH = 120
const DESCRIPTION_MAX_LENGTH = 500

export function validateTodoForm(values: TodoFormValues): TodoFormErrors {
  const errors: TodoFormErrors = {}
  const title = values.title.trim()

  if (!title) {
    errors.title = 'Title is required.'
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = 'Title must be 120 characters or fewer.'
  }

  if (values.description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = 'Description must be 500 characters or fewer.'
  }

  return errors
}

export function hasFormErrors(errors: TodoFormErrors): boolean {
  return Object.keys(errors).length > 0
}

export const TODO_FORM_LIMITS = {
  titleMaxLength: TITLE_MAX_LENGTH,
  descriptionMaxLength: DESCRIPTION_MAX_LENGTH,
} as const
