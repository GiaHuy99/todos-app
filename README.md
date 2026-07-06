# todos-app (Frontend)

Todo List Management web application — React SPA with edge runtime API proxy, paired with a Spring Boot REST backend.

**Backend repo:** [todos-app-be](../todos-app-be)

---

## Technologies

| Category | Technologies |
|---|---|
| **UI** | React 19, TypeScript, Tailwind CSS 4, Lucide React |
| **Build** | Vite 7, `@cloudflare/vite-plugin` |
| **Edge / routing** | Cloudflare Workers, Hono |
| **State & data** | Zustand, Axios, React Router 7 |
| **Tooling** | ESLint, TypeScript 5.9 |

---

## Features

- Todo CRUD with modals, confirmation dialogs, and toast feedback
- Server-side search (debounced), status filter, and pagination
- Responsive layout (desktop, tablet, mobile)
- Linear-inspired dark design system
- Edge API proxy: browser calls `/api` on the same origin; Worker forwards to the backend

---

## Project structure

```
todos-app/
├── src/
│   ├── react-app/          # React SPA
│   │   ├── app/              # Router, providers, error boundary
│   │   ├── features/todo/    # Todo feature module
│   │   └── shared/           # Reusable UI, hooks, constants
│   └── worker/
│       └── index.ts          # Hono API proxy
├── docs/
├── wrangler.json
├── vite.config.ts
└── .env.development          # Local dev only
```

---

## Local development

Requires the backend at `http://localhost:8080` ([todos-app-be](../todos-app-be/README.md)).

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite proxies `/api` → backend (via `VITE_BACKEND_URL` in `.env.development`).

---

## Architecture (high level)

```
Browser  →  React SPA  →  /api/*  →  Edge Worker proxy  →  REST API  →  MySQL
```

In production, the React app uses relative `/api` paths. The edge Worker proxies requests to the backend server.

---

## Build & deploy

Configure the backend URL in `wrangler.json` (use your own host — do not commit real credentials):

```json
"vars": {
  "BACKEND_URL": "http://YOUR_BACKEND_HOST:8080"
}
```

```bash
npm run build
npm run deploy
```

---

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_BACKEND_URL` | `.env.development` | Vite dev proxy target (local only) |
| `VITE_API_BASE_URL` | Optional build-time | Override API base URL (default: `/api`) |
| `BACKEND_URL` | `wrangler.json` | Backend URL for Worker proxy (production) |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build |
| `npm run deploy` | Deploy to edge platform |
| `npm run lint` | ESLint |
| `npm run cf-typegen` | Regenerate Worker env types |

---

## Documentation

| Document | Description |
|---|---|
| [docs/PRD.md](./docs/PRD.md) | Product requirements |
| [docs/Technical-Design.md](./docs/Technical-Design.md) | Frontend architecture |
| [docs/DESIGN.md](./docs/DESIGN.md) | UI design system |
