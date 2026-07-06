# Product Requirements Document (PRD)

## Todo List Management Web Application

| Field | Value |
|---|---|
| **Product** | Todo List Management Web Application |
| **Version** | 1.1 |
| **Status** | Deployed |
| **Repository** | `todos-app` (frontend) |
| **Audience** | Intern Full-Stack Developer Coding Assessment |
| **Design Reference** | [`DESIGN.md`](./DESIGN.md) |

---

## 1. Executive Summary

The Todo List Management Web Application is a modern, production-quality task management tool built as a full-stack coding assessment project. Users can manage personal todos through a clean, responsive web interface backed by a Spring Boot REST API and MySQL database.

The product prioritizes **simplicity**, **usability**, **maintainability**, and a polished user experience aligned with a Linear-inspired dark design system.

---

## 2. Problem Statement

Users need a lightweight way to track tasks without the complexity of enterprise project management tools. Existing solutions are often either too minimal (no search/filter) or too heavy (account setup, subscriptions, feature overload).

This product solves the gap by offering essential todo management features in a professional, portfolio-ready interface suitable for demonstrating full-stack development skills.

---

## 3. Goals & Objectives

### Primary Goals

- Enable users to create, read, update, and delete todos efficiently
- Provide server-side search, status filtering, and pagination for scalable task discovery
- Deliver immediate visual feedback for every user action
- Demonstrate clean architecture on both frontend and backend

### Success Criteria

- All core CRUD flows work end-to-end against the live REST API
- UI is responsive across desktop, tablet, and mobile
- Application loads and renders within acceptable time on standard hardware
- Codebase follows feature-based (frontend) and layered (backend) architecture
- Design system from `DESIGN.md` is applied consistently

---

## 4. Target Users

| Persona | Description | Needs |
|---|---|---|
| **Developer (Assessor)** | Evaluates coding assessment submission | Clean code, architecture, UX quality |
| **End User** | Individual managing daily tasks | Fast CRUD, search, filter, pagination, clear feedback |
| **Developer (Author)** | Intern building the application | Maintainable structure, local full-stack dev setup |

---

## 5. Scope

### In Scope (MVP)

- Todo list page with header, search, filter, paginated list
- Create todo (title + description)
- Edit todo
- Delete todo with confirmation
- Mark todo as completed / incomplete
- Server-side search todos by title (debounced)
- Server-side filter todos by status (All / Completed / Incomplete)
- Server-side pagination (10 items per page)
- Loading, empty, and error states
- Toast notifications per action type
- Responsive layout (desktop, tablet, mobile)
- REST API integration with Spring Boot backend

### Out of Scope (MVP)

- User authentication and authorization
- Multi-user / shared todos
- Due dates, priorities, tags, or attachments
- Drag-and-drop reordering
- Offline support / PWA
- Email or push notifications
- Internationalization (i18n)
- Light theme
- Calendar integration
- Adding time and date (deadline)

---

## 6. Functional Requirements

### 6.1 View Todos

| ID | Requirement |
|---|---|
| FR-01 | The system shall display todos on the Todo Page with server-side pagination |
| FR-02 | Each todo shall show title, description (if any), and completion status |
| FR-03 | Completed todos shall be visually distinct (line-through title, status badge) |
| FR-04 | The system shall show a loading state while todos are being fetched |
| FR-05 | The system shall show an empty state when no todos exist |
| FR-06 | The system shall show an error state with retry when fetch fails |
| FR-07 | The system shall show pagination controls when more than one page exists |

### 6.2 Create Todo

| ID | Requirement |
|---|---|
| FR-08 | User shall open a Create Todo modal from a floating add button |
| FR-09 | Create form shall include Title (required) and Description (optional) |
| FR-10 | Title shall be validated: required, max 120 characters |
| FR-11 | Description shall be validated: max 500 characters |
| FR-12 | Validation errors shall display inline below the relevant field |
| FR-13 | On success, the new todo appears in the list and a success toast is shown |

### 6.3 Edit Todo

| ID | Requirement |
|---|---|
| FR-14 | User shall open an Edit Todo modal from each todo card |
| FR-15 | Edit modal shall reuse the Create Todo form layout with prefilled values |
| FR-16 | On success, the list updates and an info toast is shown |

### 6.4 Delete Todo

| ID | Requirement |
|---|---|
| FR-17 | User shall trigger delete from each todo card |
| FR-18 | A confirmation dialog shall appear before deletion |
| FR-19 | On confirm, the todo is removed and a neutral toast is shown |
| FR-20 | On cancel, no changes are made |

### 6.5 Toggle Completion

| ID | Requirement |
|---|---|
| FR-21 | User shall toggle completion via a checkbox on each todo card |
| FR-22 | Toggle shall use optimistic UI with rollback on failure |
| FR-23 | Success toast color shall reflect complete (green) vs incomplete (lavender) |

### 6.6 Search, Filter & Pagination

| ID | Requirement |
|---|---|
| FR-24 | User shall search todos by title (case-insensitive, debounced, server-side) |
| FR-25 | User shall filter todos by All, Completed, or Incomplete (server-side) |
| FR-26 | Search and filter shall combine with AND logic on the server |
| FR-27 | When no results match, a filtered empty state with clear action is shown |
| FR-28 | User shall navigate pages with Previous / Next controls |

### 6.7 Feedback & UX

| ID | Requirement |
|---|---|
| FR-29 | Every successful action shall show a toast with event-appropriate color |
| FR-30 | Failed actions shall show an error toast |
| FR-31 | All interactive elements shall support hover, focus, active, and disabled states |
| FR-32 | Touch targets shall be at least 44px on mobile |

---

## 7. Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-01 | Performance | Initial page load under 3s on standard broadband |
| NFR-02 | Performance | Search debounce at 300ms to reduce unnecessary API calls |
| NFR-03 | Accessibility | WCAG 2.1 AA — focus rings, keyboard nav, ARIA labels |
| NFR-04 | Accessibility | Respect `prefers-reduced-motion` |
| NFR-05 | Maintainability | Feature-based frontend architecture |
| NFR-06 | Maintainability | Reusable shared UI components |
| NFR-07 | Compatibility | Latest Chrome, Firefox, Safari, Edge |
| NFR-08 | Responsive | Layouts for ≥1280px, 768–1023px, and <768px |
| NFR-09 | Design | Visual language defined in `DESIGN.md` |
| NFR-10 | Security | Input validation on client and server |

---

## 8. User Stories

| ID | Story | Acceptance Criteria |
|---|---|---|
| US-01 | As a user, I want to see my todos so I know what needs to be done | Paginated list renders with title, description, status |
| US-02 | As a user, I want to add a todo so I can track new tasks | Modal opens, validates, saves via API, list updates |
| US-03 | As a user, I want to edit a todo so I can update details | Edit modal prefills, saves changes via API |
| US-04 | As a user, I want to delete a todo so I can remove finished or irrelevant tasks | Confirmation required, todo removed on confirm |
| US-05 | As a user, I want to mark todos complete so I can track progress | Checkbox toggles status with visual feedback |
| US-06 | As a user, I want to search todos so I can find tasks quickly | Debounced search queries the server by title |
| US-07 | As a user, I want to filter by status so I can focus on active or done tasks | Filter dropdown queries the server by completion status |
| US-08 | As a user, I want feedback after actions so I know operations succeeded or failed | Toast appears with color matching the event |
| US-09 | As a user, I want to browse pages of todos when I have many tasks | Pagination controls load the next/previous page from the server |

---

## 9. Screens & Components

### 9.1 Screens

1. **Todo Page** — main application screen

### 9.2 Modals & Dialogs

1. **Create Todo Modal** — title, description, cancel, save
2. **Edit Todo Modal** — same layout as create, prefilled
3. **Delete Confirmation Dialog** — cancel, delete

### 9.3 Shared Components

Button, Input, Textarea, Badge, Card, Modal, Dialog, Spinner, EmptyState, Toast

### 9.4 Feature Components

TodoCard, TodoList, TodoForm, SearchBar, FilterDropdown, FloatingAddButton, Pagination

---

## 10. Data Model (Conceptual)

| Field | Type | Required | Constraints |
|---|---|---|---|
| id | number | Yes | Auto-generated, unique |
| title | string | Yes | 1–120 characters |
| description | string | No | Max 500 characters |
| completed | boolean | Yes | Default `false` |
| createdAt | datetime | Yes | Set on create |
| updatedAt | datetime | Yes | Set on create/update |

---

## 11. Toast Event Mapping

| Action | Toast Message | Visual Variant |
|---|---|---|
| Create | Todo created. | Success (green) |
| Update | Todo updated. | Info (lavender) |
| Mark complete | Todo marked complete. | Success (green) |
| Mark incomplete | Todo marked incomplete. | Info (lavender) |
| Delete | Todo deleted. | Neutral (gray) |
| Error | Something went wrong. Please try again. | Error (red) |

---

## 12. Assumptions & Dependencies

- Frontend: React 19, Vite 7, Tailwind CSS 4, React Router, Axios, Lucide React, Zustand
- Deployed on **Cloudflare Workers** with Hono edge proxy for `/api/**`
- Backend: Spring Boot REST API ([todos-app-be](../../todos-app-be)), hosted on **AWS EC2 + RDS MySQL**
- Design system is defined in [`DESIGN.md`](./DESIGN.md)
- **Local dev:** Vite proxy forwards `/api` → `http://localhost:8080`
- **Production:** React calls relative `/api`; Cloudflare Worker proxies to EC2 (`BACKEND_URL` in `wrangler.json`)
- No authentication is required for MVP

---

## 13. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Backend unavailable during development | Blocked UI testing | Start Spring Boot + MySQL locally; verify proxy config |
| Inconsistent design implementation | Poor UX quality | Enforce `DESIGN.md` tokens and shared components |
| Missing validation | Bad data in database | Client + server validation with shared rules |
| Poor mobile UX | Unusable on phones | Responsive toolbar, 44px touch targets |

---

## 14. Future Enhancements (Post-MVP)

- User authentication (JWT / session)
- Due dates and reminders
- Priority levels and labels
- Todo sorting (by date, title, status)
- Database migrations (Flyway / Liquibase)
- Unit and integration test coverage
- CI/CD pipeline
- Light theme support

---

## 15. References

- [`DESIGN.md`](./DESIGN.md) — Design system and visual language
- [`Technical-Design.md`](./Technical-Design.md) — Frontend & Worker architecture
- [todos-app-be/docs/Technical-Design.md](../../todos-app-be/docs/Technical-Design.md) — REST API, database, Docker, AWS deployment
