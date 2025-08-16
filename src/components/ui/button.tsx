import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        variant === 'default' &&
          'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'secondary' &&
          'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        variant === 'outline' &&
          'border border-input bg-background hover:bg-accent',
        variant === 'ghost' && 'bg-transparent hover:bg-accent',
        size === 'sm' && 'px-2 py-1 text-xs',
        size === 'md' && 'px-4 py-2',
        size === 'lg' && 'px-6 py-3',
        className
      )}
      {...props}
    />
  )
}
