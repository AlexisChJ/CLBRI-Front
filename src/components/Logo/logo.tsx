import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function BlueLogo() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="./logo_serch_azul"
        alt="Logo Azul"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
  )
}

export function WhiteLogo() {
    return (
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src="logo_serch_blanco"
          alt="Logo Blanco"
          fill
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    )
  }
