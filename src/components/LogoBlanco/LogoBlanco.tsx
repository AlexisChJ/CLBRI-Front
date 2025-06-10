import Image from "next/image";
import LogoBlanco from "@/assets/images/logo_blanco.png";

export function WhiteLogo() {
  return (
    <div className="relative w-fit mx-auto">
      <Image src={LogoBlanco} alt={"Logo Blanco"} className="h-auto w-35" />
    </div>
  );
}
