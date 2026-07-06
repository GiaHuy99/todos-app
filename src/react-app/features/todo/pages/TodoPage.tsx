import { useCallback, useMemo, useState } from 'react'
import { Dialog } from '@/shared/components/Dialog'
import { Modal } from '@/shared/components/Modal'
import { FloatingAddButton } from '@/features/todo/components/FloatingAddButton'
import { FilterDropdown } from '@/features/todo/components/FilterDropdown'
import { Pagination } from '@/features/todo/components/Pagination'
import { SearchBar } from '@/features/todo/components/SearchBar'
import { TodoForm } from '@/features/todo/components/TodoForm'
import { TodoList } from '@/features/todo/components/TodoList'
import { useTodoForm } from '@/features/todo/hooks/useTodoForm'
import { useTodos } from '@/features/todo/hooks/useTodos'
import type { Todo, TodoFormValues } from '@/features/todo/types/todo.types'

type ModalMode = 'create' | 'edit' | null

const emptyFormValues: TodoFormValues = {
  title: '',
  description: '',
}

export function TodoPage() {
  const {
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
  } = useTodos()

  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null)
  const [deleting, setDeleting] = useState(false)

  const formInitialValues = useMemo<TodoFormValues>(() => {
    if (modalMode === 'edit' && editingTodo) {
      return {
        title: editingTodo.title,
        description: editingTodo.description ?? '',
      }
    }

    return emptyFormValues
  }, [modalMode, editingTodo])

  const {
    values,
    errors,
    submitting,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useTodoForm({
    initialValues: formInitialValues,
    onSubmit: async (formValues) => {
      if (modalMode === 'edit' && editingTodo) {
        return updateTodo(editingTodo.id, formValues)
      }

      return createTodo(formValues)
    },
  })

  const closeModal = useCallback(() => {
    setModalMode(null)
    setEditingTodo(null)
    resetForm(emptyFormValues)
  }, [resetForm])

  const openCreateModal = () => {
    setEditingTodo(null)
    setModalMode('create')
    resetForm(emptyFormValues)
  }

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo)
    setModalMode('edit')
    resetForm({
      title: todo.title,
      description: todo.description ?? '',
    })
  }

  const handleDeleteConfirm = async () => {
    if (!deletingTodo) {
      return
    }

    setDeleting(true)
    const success = await deleteTodo(deletingTodo.id)
    setDeleting(false)

    if (success) {
      setDeletingTodo(null)
    }
  }

  return (
    <div className="min-h-svh bg-canvas pb-28">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
        <header className="pb-8 pt-10 md:pt-12">
          <p className="text-[13px] font-medium uppercase tracking-[0.4px] text-ink-subtle">
            Task management
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-[-0.6px] text-ink md:text-[28px]">
            Todos
          </h1>
          <p className="mt-2 max-w-2xl text-base text-ink-muted md:text-xl md:tracking-[-0.2px]">
            Keep track of what needs to get done.
          </p>
        </header>

        <section
          aria-label="Todo controls"
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:flex-nowrap"
        >
          <div className="w-full sm:max-w-md sm:flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <FilterDropdown
            value={filter}
            onChange={setFilter}
            count={totalElements}
          />
        </section>

        <section aria-label="Todo list">
          <TodoList
            todos={todos}
            totalElements={totalElements}
            hasActiveFilters={hasActiveFilters}
            loading={loading}
            error={error}
            onRetry={() => void refetch()}
            onClearFilters={clearFilters}
            onCreateClick={openCreateModal}
            onToggleComplete={(id, completed) =>
              void toggleTodoComplete(id, completed)
            }
            onEdit={openEditModal}
            onDelete={setDeletingTodo}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            totalElements={totalElements}
            disabled={loading}
            onPageChange={setPage}
          />
        </section>
      </div>

      <FloatingAddButton onClick={openCreateModal} />

      <Modal
        open={modalMode !== null}
        onClose={closeModal}
        title={modalMode === 'edit' ? 'Edit todo' : 'Create todo'}
      >
        <TodoForm
          key={modalMode === 'edit' ? `edit-${editingTodo?.id}` : 'create'}
          values={values}
          errors={errors}
          submitting={submitting}
          onFieldChange={setFieldValue}
          onSubmit={async (event) => {
            const success = await handleSubmit(event)
            if (success) {
              closeModal()
            }
          }}
          onCancel={closeModal}
        />
      </Modal>

      <Dialog
        open={deletingTodo !== null}
        onClose={() => setDeletingTodo(null)}
        onConfirm={() => void handleDeleteConfirm()}
        title="Delete todo?"
        loading={deleting}
        description={
          <>
            <p>
              <span className="font-medium text-ink">
                &ldquo;{deletingTodo?.title}&rdquo;
              </span>{' '}
              will be permanently deleted.
            </p>
            <p>This action cannot be undone.</p>
          </>
        }
      />
    </div>
  )
}
