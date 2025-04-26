"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonsProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  color?: "login" | "register"
}

const styleMap: Record<NonNullable<ButtonsProps["color"]>, string> = {
  login:    "bg-blue-600 text-white hover:bg-blue-500",
  register: "border border-blue-600 bg-white text-blue-600 hover:bg-blue-50",
}


const Buttons: React.FC<ButtonsProps> = ({
  text,
  color = "login",
  className,
  ...props
}) => (
  <Button
    size="lg"
    variant="default"
    className={cn("w-full rounded-full", styleMap[color], className)}
    {...props}
  >
    {text}
  </Button>
)

export default Buttons
