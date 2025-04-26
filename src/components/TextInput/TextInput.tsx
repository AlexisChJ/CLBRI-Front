'use client'

import * as React from 'react'

import { Input, type InputProps } from '../ui/input'
import { cn } from '@/lib/utils'
import { Zen_Maru_Gothic } from 'next/font/google'

const zen_700 = Zen_Maru_Gothic({weight: "700"})

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return(
        <div className='relative w-auto'>
            <Input
                type='text'
                className={cn(`${ zen_700.className } hide-password-toggle pr-10 shadow-none bg-[#E9EBEA] text-[#5B5B5B] rounded-2xl`, className)}
                ref={ref}
                {...props}
            />
        </div>
    )
})
TextInput.displayName = 'TextInput'

export { TextInput }