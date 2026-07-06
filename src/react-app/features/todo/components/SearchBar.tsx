import { Search, X } from 'lucide-react'
import { Input } from '@/shared/components/Input'
import { Button } from '@/shared/components/Button'

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-subtle"
        aria-hidden="true"
      />
      <Input
        id="todo-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search todos…"
        aria-label="Search todos by title"
        className="pl-9 pr-10"
      />
      {value ? (
        <Button
          type="button"
          variant="tertiary"
          size="sm"
          aria-label="Clear search"
          className="absolute right-1 top-1/2 min-h-8 -translate-y-1/2 px-2"
          onClick={() => onChange('')}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      ) : null}
    </div>
  )
}
