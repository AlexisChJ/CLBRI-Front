"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil, Check } from "lucide-react"

type ProfileContainerProps = React.ComponentProps<typeof Card> & {
  avatarSrc?: string
  name: string
  organization: string
  phone: string
  email: string
  passwordMask: string
  address: string
  onSave?: (data: {
    name: string
    organization: string
    phone: string
    email: string
    passwordMask: string
    address: string
  }) => void
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  className,
  avatarSrc,
  name,
  organization,
  phone,
  email,
  passwordMask,
  address,
  onSave,
  ...props
}) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [formState, setFormState] = React.useState({
    name,
    organization,
    phone,
    email,
    passwordMask,
    address,
  })

  const handleChange = (field: keyof typeof formState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({ ...formState, [field]: e.target.value })
  }

  const toggleEdit = () => {
    if (isEditing && onSave) {
      onSave(formState)
    }
    setIsEditing(!isEditing)
  }

  return (
    <div>
      <div className="absolute -top-12 left-1/2 z-10 -translate-x-1/2 pt-[50]">
        <Avatar className="h-24 w-24 ml-36 -mb-11">
          {avatarSrc ? (
            <AvatarImage src={avatarSrc} alt={formState.name} />
          ) : (
            <AvatarFallback>{formState.name[0]}</AvatarFallback>
          )}
        </Avatar>
        <Card className={cn("w-[380px] pt-14 overflow-visible", className)} {...props}>
          <Button
            className="absolute right-5 top-30"
            variant="ghost"
            onClick={toggleEdit}
          >
            {isEditing ? <Check /> : <Pencil />}
          </Button>
          <CardContent className="space-y-2 text-center">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={formState.name}
                  onChange={handleChange("name")}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  value={formState.organization}
                  onChange={handleChange("organization")}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Organización"
                />
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange("phone")}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Teléfono"
                />
                <input
                  type="email"
                  value={formState.email}
                  onChange={handleChange("email")}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Correo"
                />
                <input
                  type="text"
                  value={formState.passwordMask}
                  onChange={handleChange("passwordMask")}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Contraseña"
                />
                <input
                  type="text"
                  value={formState.address}
                  onChange={handleChange("address")}
                  className="w-full border rounded px-2 py-1"
                  placeholder="Dirección"
                />
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">{formState.name}</h2>
                <p className="text-sm text-muted-foreground">{formState.organization}</p>
                <p className="text-sm text-muted-foreground">{formState.phone}</p>
                <p className="text-sm text-muted-foreground">{formState.email}</p>
                <p className="text-sm text-muted-foreground">{formState.passwordMask}</p>
                <p className="text-sm text-muted-foreground">{formState.address}</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfileContainer
