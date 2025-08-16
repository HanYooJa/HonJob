import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        variant === 'default' && 'bg-gray-200 text-gray-800',
        variant === 'secondary' && 'bg-blue-100 text-blue-800',
        variant === 'outline' && 'border-gray-300 text-gray-800',
        variant === 'ghost' && 'bg-transparent text-gray-800',
        className
      )}
      {...props}
    />
  )
}
