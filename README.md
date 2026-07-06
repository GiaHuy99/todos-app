# todos-app (Frontend)

Todo List Management web application — React SPA deployed on **Cloudflare Workers**, with a Hono edge proxy that forwards `/api/**` to the Spring Boot backend on AWS EC2.

**Live:** [https://todos-app.huykidbestboy1412.workers.dev](https://todos-app.huykidbestboy1412.workers.dev)

**Backend repo:** [todos-app-be](../todos-app-be)

---

## Stack

| Layer | Technology |
|---|---|
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Build | Vite 7, `@cloudflare/vite-plugin` |
| Edge | Cloudflare Workers, Hono |
| HTTP client | Axios |
| State | Zustand |
| Routing | React Router 7 |

---

## Project structure

```
todos-app/
├── src/
│   ├── react-app/          # React SPA
│   │   ├── app/              # Router, providers, error boundary
│   │   ├── features/todo/    # Todo feature (components, hooks, store, API)
│   │   └── shared/           # Reusable UI, hooks, constants
│   └── worker/
│       └── index.ts          # Hono API proxy → EC2 backend
├── docs/                     # Product & technical documentation
├── wrangler.json             # Cloudflare Workers config (BACKEND_URL)
├── vite.config.ts            # Vite dev proxy for local backend
└── .env.development          # Local dev only (VITE_BACKEND_URL)
```

---

## Local development

Requires the backend running at `http://localhost:8080` (see [todos-app-be README](../todos-app-be/README.md)).

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Vite proxies `/api` → `http://localhost:8080` (configured via `VITE_BACKEND_URL` in `.env.development`).

---

## Production architecture

```
Browser
  │  HTTPS  /api/todos
  ▼
Cloudflare Workers (this repo)
  │  React static assets (dist/client)
  │  Hono proxy /api/** → BACKEND_URL
  ▼
AWS EC2 — Spring Boot :8080
  ▼
AWS RDS MySQL
```

In production the React app calls **relative** `/api` paths. The Worker proxies them to the backend — no CORS or mixed-content issues in the browser.

---

## Deploy to Cloudflare

1. Set the backend URL in `wrangler.json`:

```json
"vars": {
  "BACKEND_URL": "http://<EC2_PUBLIC_DNS_OR_IP>:8080"
}
```

2. Build and deploy:

```bash
npm run build
npm run deploy
```

3. Verify:

```bash
curl "https://todos-app.huykidbestboy1412.workers.dev/api/todos?page=0&size=10"
```

### Worker proxy notes

- Route pattern: `/api/**` (covers nested paths like `/api/todos/1`)
- Strips `host`, `origin`, and `referer` headers before forwarding (prevents Cloudflare Error 1003)
- `BACKEND_URL` must be the **EC2 public hostname or IP**, not the Workers domain

---

## Environment variables

| Variable | Where | Purpose |
|---|---|---|
| `VITE_BACKEND_URL` | `.env.development` | Vite dev proxy target (local only) |
| `VITE_API_BASE_URL` | Optional build-time | Override API base URL (default: `/api`) |
| `BACKEND_URL` | `wrangler.json` | EC2 backend URL for Worker proxy (production) |

`.env.development` is **not** used in Cloudflare production builds.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm run lint` | ESLint |
| `npm run cf-typegen` | Regenerate Worker env types |

---

## Documentation

| Document | Description |
|---|---|
| [docs/PRD.md](./docs/PRD.md) | Product requirements |
| [docs/Technical-Design.md](./docs/Technical-Design.md) | Frontend & Worker architecture |
| [docs/DESIGN.md](./docs/DESIGN.md) | UI design system |

Backend API and deployment docs live in the [todos-app-be](../todos-app-be) repository.
