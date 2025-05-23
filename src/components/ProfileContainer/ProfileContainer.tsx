"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Pencil, Check } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

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

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
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
      <div className="flex flex-col items-center justify-center">
        <Avatar className="h-24 w-24 mx-auto -mb-11 -top-3 z-10">
          {avatarSrc ? (
            <AvatarImage src={avatarSrc} alt={formState.name} />
          ) : (
            <AvatarFallback>{formState.name[0]}</AvatarFallback>
          )}
        </Avatar>

        <Card className={cn("w-[380px] pt-14 overflow-visible relative", className)} {...props}>
          <Button
            className="absolute pt-1 right-1 transition-all duration-300 ease-in-out transform"
            style={{ top: isEditing ? '4px' : '8px' }}
            variant="ghost"
            onClick={toggleEdit}
          >
            {isEditing ? <Check /> : <Pencil />}
          </Button>

          <CardContent className="space-y-2 text-center">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  transition={{ duration: 0.3 }}
                >
                  <input type="text" value={formState.name} onChange={handleChange("name")} className="w-full border rounded px-2 py-1 mb-2" placeholder="Nombre" />
                  <input type="text" value={formState.organization} onChange={handleChange("organization")} className="w-full border rounded px-2 py-1 mb-2" placeholder="Organización" />
                  <input type="tel" value={formState.phone} onChange={handleChange("phone")} className="w-full border rounded px-2 py-1 mb-2" placeholder="Teléfono" />
                  <input type="email" value={formState.email} onChange={handleChange("email")} className="w-full border rounded px-2 py-1 mb-2" placeholder="Correo" />
                  <input type="text" value={formState.passwordMask} onChange={handleChange("passwordMask")} className="w-full border rounded px-2 py-1 mb-2" placeholder="Contraseña" />
                  <input type="text" value={formState.address} onChange={handleChange("address")} className="w-full border rounded px-2 py-1" placeholder="Dirección" />
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeVariants}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold">{formState.name}</h2>
                  <p className="text-sm text-muted-foreground">{formState.organization}</p>
                  <p className="text-sm text-muted-foreground">{formState.phone}</p>
                  <p className="text-sm text-muted-foreground">{formState.email}</p>
                  <p className="text-sm text-muted-foreground">{formState.passwordMask}</p>
                  <p className="text-sm text-muted-foreground">{formState.address}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfileContainer
