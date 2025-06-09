"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ProfileContainerProps = React.ComponentProps<typeof Card> & {
  avatarSrc?: string;
  name: string;
  workplace: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  onSave?: (data: {
    avatarSrc?: string;
    name: string;
    workplace: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  }) => void;
};

const fadeVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  className,
  avatarSrc,
  name,
  workplace,
  phone,
  email,
  address,
  city,
  state,
  country,
  postal_code,
  onSave,
  ...props
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formState, setFormState] = React.useState({
    name,
    workplace,
    phone,
    email,
    address,
    city,
    state,
    country,
    postal_code,
    avatarSrc: avatarSrc || "",
  });
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange =
    (field: keyof typeof formState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, [field]: e.target.value });
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState((prev) => ({
          ...prev,
          avatarSrc: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const toggleEdit = () => {
    if (isEditing && onSave) {
      onSave(formState);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <Avatar
          onClick={handleAvatarClick}
          className="h-24 w-24 mx-auto -mb-11 -top-1 z-10 cursor-pointer hover:opacity-80 transition"
        >
          {formState.avatarSrc ? (
            <AvatarImage src={formState.avatarSrc} alt={formState.name} />
          ) : (
            <AvatarFallback>{formState.name[0]}</AvatarFallback>
          )}
        </Avatar>

        <Card
          className={cn("w-[380px] pt-14 overflow-visible relative", className)}
          {...props}
        >
          <Button
            className="absolute pt-1 right-1 transition-all duration-300 ease-in-out transform"
            style={{ top: isEditing ? "4px" : "8px" }}
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
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <input
                    type="text"
                    value={formState.name}
                    onChange={handleChange("name")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Nombre"
                  />
                  <input
                    type="text"
                    value={formState.workplace}
                    onChange={handleChange("workplace")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Organización"
                  />
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange("phone")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Teléfono"
                  />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={handleChange("email")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Correo"
                  />
                  <input
                    type="text"
                    value={formState.address}
                    onChange={handleChange("address")}
                    className="w-full border rounded px-2 py-1"
                    placeholder="Dirección"
                  />
                  <input
                    type="text"
                    value={formState.city}
                    onChange={handleChange("city")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Ciudad"
                  />
                  <input
                    type="text"
                    value={formState.state}
                    onChange={handleChange("state")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Estado"
                  />
                  <input
                    type="text"
                    value={formState.country}
                    onChange={handleChange("country")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="País"
                  />
                  <input
                    type="text"
                    value={formState.postal_code}
                    onChange={handleChange("postal_code")}
                    className="w-full border rounded px-2 py-1 mb-2"
                    placeholder="Código Postal"
                  />
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
                  <p className="text-sm text-muted-foreground">
                    {formState.workplace}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formState.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formState.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formState.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formState.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formState.state}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formState.country}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formState.postal_code}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileContainer;
