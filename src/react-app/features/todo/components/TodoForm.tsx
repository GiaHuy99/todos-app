import { Input } from '@/shared/components/Input'
import { Textarea } from '@/shared/components/Textarea'
import { Button } from '@/shared/components/Button'
import type { TodoFormErrors, TodoFormValues } from '@/features/todo/types/todo.types'
import { TODO_FORM_LIMITS } from '@/features/todo/utils/validateTodoForm'

export interface TodoFormProps {
  values: TodoFormValues
  errors: TodoFormErrors
  submitting: boolean
  submitLabel?: string
  onFieldChange: (field: keyof TodoFormValues, value: string) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>
  onCancel: () => void
}

export function TodoForm({
  values,
  errors,
  submitting,
  submitLabel = 'Save',
  onFieldChange,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
      <div>
        <label
          htmlFor="todo-title"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Title <span className="text-primary">*</span>
        </label>
        <Input
          id="todo-title"
          value={values.title}
          maxLength={TODO_FORM_LIMITS.titleMaxLength}
          placeholder="What needs to be done?"
          error={errors.title}
          aria-describedby={errors.title ? 'todo-title-error' : undefined}
          onChange={(event) => onFieldChange('title', event.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="todo-description"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Description
        </label>
        <Textarea
          id="todo-description"
          value={values.description}
          maxLength={TODO_FORM_LIMITS.descriptionMaxLength}
          placeholder="Add optional details…"
          error={errors.description}
          aria-describedby={
            errors.description ? 'todo-description-error' : undefined
          }
          onChange={(event) => onFieldChange('description', event.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" disabled={submitting} onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting} loadingText="Saving…">
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
