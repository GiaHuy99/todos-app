# Design System

| Field | Value |
|---|---|
| **Repository** | `todos-app` |
| **Version** | 1.0 |
| **Status** | Implemented |
| **Source of truth** | `src/react-app/index.css` (`@theme` block) |

Linear-inspired dark theme for the Todo List application.

---

## 1. Design principles

- Dark-first, minimal chrome
- High contrast for readability
- Consistent spacing and border radius
- Event-colored feedback (toasts, badges)
- Accessible focus rings and touch targets (min 44 px on mobile)

---

## 2. Color tokens

| Token | Value | Usage |
|---|---|---|
| `canvas` | `#010102` | Page background |
| `surface-1` | `#0f1011` | Cards, panels |
| `surface-2` | `#141516` | Inputs, elevated surfaces |
| `surface-3` | `#18191a` | Hover states |
| `surface-4` | `#191a1b` | Subtle elevation |
| `hairline` | `#23252a` | Default borders |
| `hairline-strong` | `#34343a` | Emphasized borders |
| `ink` | `#f7f8f8` | Primary text |
| `ink-muted` | `#d0d6e0` | Secondary text |
| `ink-subtle` | `#8a8f98` | Tertiary text |
| `primary` | `#5e6ad2` | CTAs, focus rings |
| `primary-hover` | `#828fff` | Button hover |
| `success` | `#27a644` | Completed badge, success toast |
| `error` | `#e5484d` | Validation errors, error toast |

---

## 3. Typography

| Role | Font stack |
|---|---|
| Display / body | Inter, SF Pro Display, system-ui |
| Monospace | JetBrains Mono, ui-monospace |

Headlines use negative letter-spacing for a compact, Linear-like feel.

---

## 4. Border radius

| Token | Value |
|---|---|
| `radius-xs` | 4px |
| `radius-sm` | 6px |
| `radius-md` | 8px |
| `radius-lg` | 12px |
| `radius-xl` | 16px |

---

## 5. Components

### Shared UI (`src/react-app/shared/components/`)

Button, Input, Textarea, Badge, Card, Modal, Dialog, Spinner, EmptyState, Toast

### Feature UI (`src/react-app/features/todo/components/`)

TodoCard, TodoList, TodoForm, SearchBar, FilterDropdown, FloatingAddButton, Pagination

---

## 6. Toast variants

| Variant | Color | Events |
|---|---|---|
| `success` | Green | Created, marked complete |
| `info` | Lavender / primary tint | Updated, marked incomplete |
| `neutral` | Gray | Deleted |
| `error` | Red | API / action failures |

---

## 7. Responsive breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Desktop | ≥ 1024px | Single-row toolbar |
| Tablet | 768–1023px | Wrapped toolbar |
| Mobile | < 768px | Stacked controls, card actions below content |

---

## 8. Accessibility

- `focus-visible:ring-2 ring-primary-focus/50` on interactive elements
- Keyboard: Tab order, Escape closes modals, Enter submits forms
- ARIA: `aria-label`, `aria-live="polite"`, `role="dialog"`, `role="checkbox"`
- `@media (prefers-reduced-motion: reduce)` in global CSS

---

## 9. References

- [PRD](./PRD.md) — UX requirements and toast mapping
- [Technical Design](./Technical-Design.md) — Component architecture
