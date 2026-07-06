import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/shared/components/Button'
import { cn } from '@/shared/utils/cn'
import type { TodoFilter } from '@/features/todo/types/todo.types'
import { getFilterLabel } from '@/features/todo/utils/filterLabels'

export interface FilterDropdownProps {
  value: TodoFilter
  onChange: (value: TodoFilter) => void
  count?: number
}

const filterOptions: TodoFilter[] = ['all', 'completed', 'incomplete']

export function FilterDropdown({ value, onChange, count }: FilterDropdownProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const label = getFilterLabel(value)
  const triggerLabel = count !== undefined ? `${label} (${count})` : label

  return (
    <div ref={containerRef} className="relative shrink-0">
      <Button
        type="button"
        variant="secondary"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="min-w-[120px] justify-between gap-2"
        onClick={() => setOpen((current) => !current)}
      >
        <span>{triggerLabel}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </Button>

      {open ? (
        <ul
          role="listbox"
          aria-label="Filter todos by status"
          className="absolute right-0 z-20 mt-2 min-w-[160px] overflow-hidden rounded-md border border-hairline-tertiary bg-surface-3 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
        >
          {filterOptions.map((option) => {
            const isSelected = option === value

            return (
              <li key={option} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    'flex w-full items-center px-3 py-2.5 text-left text-sm transition-colors',
                    'hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-none',
                    isSelected ? 'bg-surface-2 text-ink' : 'text-ink-muted',
                  )}
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                  }}
                >
                  {getFilterLabel(option)}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
