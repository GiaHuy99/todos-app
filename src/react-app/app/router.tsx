import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodoPage } from '@/features/todo/pages/TodoPage'
import { ROUTES } from '@/shared/constants/routes'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.todos} element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
