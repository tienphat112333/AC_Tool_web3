import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from '../../utils/cn'

const inputVariants = cva(
  'peer flex w-full items-center rounded-lg border border-[#009E99] bg-[#F5FBFB] px-3 py-2  text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009E99] disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10',
        sm: 'h-8',
        lg: 'h-12',
      },
      hasError: {
        true: 'border-red-500 focus-visible:ring-red-500',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, hasError, icon, placeholder, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={cn(inputVariants({ size, hasError, className }))}
          placeholder=" "
          {...props}
        />

        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-400 gap-2 transition-all
          peer-focus:hidden 
          peer-[:not(:placeholder-shown)]:hidden"
        >
          {icon}

          <span className="text-sm text-gray-400">{placeholder}</span>
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
