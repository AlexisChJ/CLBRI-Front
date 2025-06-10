import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import * as React from "react"

type SwitchDemoProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function SwitchDemo({ checked, onCheckedChange }: SwitchDemoProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="roleVerifier"
        checked={checked}
        data-testid="admin-switch"
        onCheckedChange={onCheckedChange}
        className={checked ? "data-[state=checked]:bg-[#3A70C3] data-[state=checked]:border-[#3A70C3]" : ""}
      />
      <Label htmlFor="roleVerifier" className="text-[#9B9B9B]">¿Eres administrador?</Label>
    </div>
  )
}