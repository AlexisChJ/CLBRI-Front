import Image from "next/image";
import LogoAzul from "@/assets/images/logo_azul.png";

export function BlueLogo({ className = "" }: { className?: string }) {
  return (
    <div className="relative w-fit mx-auto">
      <Image
        src={LogoAzul}
        alt={"Logo Azul"}
        className={`h-auto ${className}`}
      />
    </div>
  );
}
