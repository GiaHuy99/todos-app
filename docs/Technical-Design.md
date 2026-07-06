# Technical Design — Frontend

| Field | Value |
|---|---|
| **Repository** | `todos-app` |
| **Version** | 1.2 |
| **Status** | Complete |
| **Related** | [PRD](./PRD.md) · [DESIGN](./DESIGN.md) · [Backend Technical Design](../../todos-app-be/docs/Technical-Design.md) |

---

## 1. Overview

React SPA with an edge Worker that proxies `/api/**` to the Spring Boot backend. The browser always calls same-origin `/api` paths.

```
Browser → React SPA → /api/* → Edge Worker proxy → REST API → MySQL
```

---

## 2. Technologies

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Build | Vite 7 |
| Edge | Cloudflare Workers, Hono |
| HTTP | Axios |
| State | Zustand |
| Routing | React Router 7 |
| Icons | Lucide React |

---

## 3. Repository structure

```
src/react-app/
├── app/                    # Router, providers
├── features/todo/          # Components, hooks, store, API
└── shared/                 # UI kit, hooks, constants

src/worker/
└── index.ts                # Hono API proxy
```

---

## 4. Architecture

### 4.1 Feature-based modules

Self-contained todo feature with components, hooks, Zustand store, services, types, and utils.

### 4.2 State management

| State | Location |
|---|---|
| Todos, filter, search, pagination | `todoStore` (Zustand) |
| Modals | `TodoPage` local state |
| Form | `useTodoForm` hook |
| Toasts | `ToastProvider` (Context) |

### 4.3 Data flow

```
User → TodoPage → useTodos → todoStore → todoApi → /api/todos
```

---

## 5. API integration

```typescript
// shared/constants/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'
```

Production uses relative `/api`. The edge Worker forwards to the configured backend URL.

Endpoints consumed: `GET/POST /api/todos`, `PUT/PATCH/DELETE /api/todos/{id}`.

Full API contract: [Backend Technical Design](../../todos-app-be/docs/Technical-Design.md#6-rest-api-specification).

---

## 6. Local development

Vite dev proxy (`.env.development`):

```
VITE_BACKEND_URL=http://localhost:8080
```

Not used in production builds.

---

## 7. Edge Worker proxy

- Route: `/api/**`
- Forwards method, body, and sanitized headers to `BACKEND_URL`
- Strips `host`, `origin`, `referer` before upstream fetch
- Configured via `BACKEND_URL` in `wrangler.json` (set locally — use placeholders in git)

---

## 8. Validation (client)

| Field | Rules |
|---|---|
| title | Required, max 120 characters |
| description | Optional, max 500 characters |

Implementation: `features/todo/utils/validateTodoForm.ts`

---

## 9. Implementation status

| Component | Status |
|---|---|
| React UI | ✅ |
| Zustand store | ✅ |
| Server-side pagination / filter / search | ✅ |
| Toast system | ✅ |
| Design tokens | ✅ |
| Edge deploy + API proxy | ✅ |

---

## 10. References

- [PRD](./PRD.md)
- [DESIGN](./DESIGN.md)
- [Backend Technical Design](../../todos-app-be/docs/Technical-Design.md)
