"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Zen_Maru_Gothic } from "next/font/google"

type ButtonsProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  color?: "login" | "register"
}

const styleMap: Record<NonNullable<ButtonsProps["color"]>, string> = {
  login:    "bg-[#3A70C3] text-white hover:bg-[#21357C]",
  register: "border border-[#3A70C3] border-2 bg-white text-[#3A70C3] hover:bg-[#E9EBEA]",
}

const zen_700 = Zen_Maru_Gothic({weight: "700", subsets: ["latin"], preload: true })

const Buttons: React.FC<ButtonsProps> = ({
  text,
  color = "login",
  className,
  ...props
}) => (
  <Button
    size="lg"
    variant="default"
    className={cn(`${ zen_700.className } w-full rounded-full`, styleMap[color], className)}
    {...props}
  >
    {text}
  </Button>
)

export default Buttons
