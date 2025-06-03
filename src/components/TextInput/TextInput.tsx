import * as React from 'react'
import { Input, type InputProps } from '../ui/input'
import { cn } from '@/lib/utils'
import { Zen_Maru_Gothic } from 'next/font/google'

const zen_700 = Zen_Maru_Gothic({ weight: "700", subsets: ['latin'], preload: true })

type CustomInputProps = InputProps & {
  hasError?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, hasError = false, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          type="text"
          ref={ref}
          className={cn(
            `${zen_700.className} hide-password-toggle pr-10 shadow-none rounded-2xl`,
            hasError ? 'bg-red-200 border border-red-500' : 'bg-[#E9EBEA]',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput };
