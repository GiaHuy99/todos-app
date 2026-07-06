# Technical Design — Frontend

| Field | Value |
|---|---|
| **Repository** | `todos-app` |
| **Version** | 1.2 |
| **Status** | Deployed |
| **Related** | [PRD](./PRD.md) · [DESIGN](./DESIGN.md) · [Backend Technical Design](../../todos-app-be/docs/Technical-Design.md) |

---

## 1. Overview

The frontend is a React SPA served as static assets from Cloudflare Workers. API calls use the relative path `/api`, which the Hono Worker proxies to the Spring Boot backend on AWS EC2.

```
┌──────────────────────────────────────────────────────────────────┐
│                         Browser                                  │
│  React SPA  →  todoApi (Axios)  →  /api/todos                    │
└───────────────────────────────┬──────────────────────────────────┘
                                │ HTTPS (same origin)
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│              Cloudflare Workers (todos-app)                      │
│  Static assets (dist/client)  +  Hono /api/** proxy              │
└───────────────────────────────┬──────────────────────────────────┘
                                │ HTTP (server-side fetch)
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│         AWS EC2 — Spring Boot :8080 (todos-app-be)               │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19.x |
| Build | Vite | 7.x |
| Edge runtime | Cloudflare Workers + Hono | — |
| Language | TypeScript | 5.9 |
| Styling | Tailwind CSS | 4.x |
| Routing | React Router | 7.x |
| HTTP | Axios | 1.x |
| State | Zustand | 5.x |
| Icons | Lucide React | 1.x |

---

## 3. Repository structure

```
src/
├── react-app/
│   ├── app/
│   │   ├── providers.tsx         # ToastProvider
│   │   ├── router.tsx            # React Router
│   │   └── ErrorBoundary.tsx
│   ├── features/todo/
│   │   ├── components/           # TodoCard, TodoList, TodoForm, etc.
│   │   ├── hooks/                # useTodos, useTodoForm
│   │   ├── store/todoStore.ts    # Zustand store
│   │   ├── services/todoApi.ts   # Axios client
│   │   ├── types/
│   │   ├── utils/
│   │   └── pages/TodoPage.tsx
│   ├── shared/
│   │   ├── components/           # Button, Modal, Toast, etc.
│   │   ├── hooks/                # useDebounce, useToast
│   │   └── constants/api.ts      # API_BASE_URL, endpoints
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # Design tokens (@theme)
└── worker/
    └── index.ts                  # Hono API proxy
```

---

## 4. Architecture patterns

### 4.1 Feature-based modules

Each feature owns its components, hooks, store, services, types, and utils. Shared code lives in `shared/`.

### 4.2 State management

| State | Location | Strategy |
|---|---|---|
| Todo list, filter, search, pagination | `todoStore` (Zustand) | Global store with async actions |
| Modal open / edit target | `TodoPage` | Local `useState` |
| Form values / errors | `useTodoForm` | Local state |
| Toasts | `ToastProvider` | React Context |

`useTodos` bridges the store with debounced fetch effects and toast feedback.

### 4.3 Data flow

```
User action → TodoPage / TodoCard
           → useTodos
           → todoStore action → todoApi → /api/todos
           → showToast
```

---

## 5. API integration

### 5.1 Base URL

```typescript
// src/react-app/shared/constants/api.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'
```

Production uses `/api` (same origin). The Worker proxies to EC2 — no `VITE_API_BASE_URL` needed.

### 5.2 Endpoints consumed

| Method | Path | Used by |
|---|---|---|
| GET | `/api/todos` | List with pagination, search, filter |
| POST | `/api/todos` | Create |
| PUT | `/api/todos/{id}` | Full update |
| PATCH | `/api/todos/{id}` | Toggle completion |
| DELETE | `/api/todos/{id}` | Delete |

Full API contract: [Backend Technical Design](../../todos-app-be/docs/Technical-Design.md#6-rest-api-specification).

---

## 6. Local development proxy

```typescript
// vite.config.ts — dev only
server: {
  proxy: {
    '/api': {
      target: process.env.VITE_BACKEND_URL ?? 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

`.env.development`:

```
VITE_BACKEND_URL=http://localhost:8080
```

This proxy does **not** run in production. Cloudflare Worker handles routing instead.

---

## 7. Cloudflare Worker proxy

```typescript
// src/worker/index.ts
app.all('/api/**', async (c) => {
  const target = `${c.env.BACKEND_URL}${url.pathname}${url.search}`
  // Strip host/origin/referer before fetch to avoid Cloudflare Error 1003
  return fetch(target, { method, headers, body })
})
```

Configuration in `wrangler.json`:

```json
{
  "vars": {
    "BACKEND_URL": "http://ec2-3-84-174-239.compute-1.amazonaws.com:8080"
  },
  "assets": {
    "directory": "./dist/client",
    "not_found_handling": "single-page-application"
  }
}
```

### Why strip headers?

Forwarding `Host: todos-app....workers.dev` to EC2 causes Cloudflare's fetch runtime to treat the subrequest as internal traffic, returning Error 1003. Removing `host`, `origin`, and `referer` fixes this.

---

## 8. Search, filter & pagination

All list queries are **server-side**:

1. `useTodos` debounces search input (300 ms)
2. `todoStore.fetchTodos()` → `GET /api/todos?page=&size=&completed=&search=`
3. Backend returns `PageResponse<Todo>`

---

## 9. Validation (client)

| Field | Rules |
|---|---|
| title | Required, max 120 characters |
| description | Optional, max 500 characters |

Implementation: `features/todo/utils/validateTodoForm.ts`

---

## 10. Error handling

| Scenario | Behavior |
|---|---|
| Fetch failure | Error empty state with Retry |
| Toggle failure | Optimistic UI rollback + error toast |
| Form invalid | Inline field errors |
| Network error | Toast: "Something went wrong. Please try again." |

---

## 11. Deployment

```bash
# 1. Update BACKEND_URL in wrangler.json
# 2. Build and deploy
npm run build
npm run deploy

# 3. Monitor
npx wrangler tail
```

Ensure EC2 Security Group allows inbound **8080** from the internet so the Worker can reach the backend.

---

## 12. Implementation status

| Component | Status |
|---|---|
| React UI | ✅ Complete |
| Zustand store | ✅ Complete |
| Server-side pagination / filter / search | ✅ Complete |
| Toast system | ✅ Complete |
| Design tokens | ✅ Complete |
| Cloudflare Workers deploy | ✅ Complete |
| Hono API proxy | ✅ Complete |
| Integration tests | ⬜ Not implemented |

---

## 13. References

- [PRD](./PRD.md) — Product requirements
- [DESIGN](./DESIGN.md) — Visual design system
- [Backend Technical Design](../../todos-app-be/docs/Technical-Design.md) — REST API, database, Docker, AWS
