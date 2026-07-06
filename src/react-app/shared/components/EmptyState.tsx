import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        className,
      )}
    >
      {icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 text-ink-subtle">
          {icon}
        </div>
      ) : null}
      <h3 className="text-[22px] font-medium tracking-[-0.4px] text-ink">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-ink-subtle">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
