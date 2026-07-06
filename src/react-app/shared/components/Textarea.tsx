import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          id={id}
          aria-invalid={Boolean(error)}
          className={cn(
            'min-h-[120px] w-full resize-y rounded-md border bg-surface-1 px-3 py-2 text-base leading-normal text-ink',
            'placeholder:text-ink-subtle transition-colors duration-150',
            'hover:border-hairline-strong',
            'focus:border-hairline-strong focus:outline-none focus:ring-2 focus:ring-primary-focus/50',
            'disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-ink-tertiary disabled:opacity-60',
            error
              ? 'border-error/60 ring-1 ring-error/30'
              : 'border-hairline',
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
