import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  interactive?: boolean
}

export function Card({
  children,
  className,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <article
      className={cn(
        'rounded-lg border border-hairline bg-surface-1 p-6',
        interactive &&
          'transition-colors duration-150 hover:border-hairline-strong hover:bg-surface-2',
        className,
      )}
      {...props}
    >
      {children}
    </article>
  )
}
