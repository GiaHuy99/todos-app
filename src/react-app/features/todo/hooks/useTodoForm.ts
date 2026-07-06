import { useCallback, useState } from 'react'
import type { TodoFormErrors, TodoFormValues } from '@/features/todo/types/todo.types'
import {
  hasFormErrors,
  validateTodoForm,
} from '@/features/todo/utils/validateTodoForm'

interface UseTodoFormOptions {
  initialValues?: TodoFormValues
  onSubmit: (values: TodoFormValues) => Promise<boolean>
}

interface UseTodoFormReturn {
  values: TodoFormValues
  errors: TodoFormErrors
  submitting: boolean
  setFieldValue: (field: keyof TodoFormValues, value: string) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<boolean>
  resetForm: (nextValues?: TodoFormValues) => void
}

const defaultValues: TodoFormValues = {
  title: '',
  description: '',
}

export function useTodoForm({
  initialValues = defaultValues,
  onSubmit,
}: UseTodoFormOptions): UseTodoFormReturn {
  const [values, setValues] = useState<TodoFormValues>(initialValues)
  const [errors, setErrors] = useState<TodoFormErrors>({})
  const [submitting, setSubmitting] = useState(false)

  const setFieldValue = useCallback(
    (field: keyof TodoFormValues, value: string) => {
      setValues((current) => ({ ...current, [field]: value }))
      setErrors((current) => {
        if (!current[field]) {
          return current
        }

        const next = { ...current }
        delete next[field]
        return next
      })
    },
    [],
  )

  const resetForm = useCallback((nextValues: TodoFormValues = defaultValues) => {
    setValues(nextValues)
    setErrors({})
    setSubmitting(false)
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const nextErrors = validateTodoForm(values)

      if (hasFormErrors(nextErrors)) {
        setErrors(nextErrors)
        return false
      }

      setSubmitting(true)

      const success = await onSubmit({
        title: values.title.trim(),
        description: values.description.trim(),
      })

      setSubmitting(false)

      if (success) {
        resetForm()
      }

      return success
    },
    [onSubmit, resetForm, values],
  )

  return {
    values,
    errors,
    submitting,
    setFieldValue,
    handleSubmit,
    resetForm,
  }
}
