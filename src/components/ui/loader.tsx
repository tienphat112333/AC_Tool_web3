import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from '../../utils/cn'

const loaderVariants = cva(
  'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface LoaderProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof loaderVariants> {}

export const Loader = ({ className, size, ...props }: LoaderProps) => {
  return <span className={cn(loaderVariants({ size }), className)} {...props} />
}
