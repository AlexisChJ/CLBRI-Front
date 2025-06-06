"use client";
import { NavBar } from "@/components/NavBar/NavBar";
import { Prompt } from "next/font/google";
import ProfileContainer from "@/components/ProfileContainer/ProfileContainer";
import { useRouter } from "next/navigation";
import Buttons from "@/components/Buttons/Buttons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function Perfil() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="flex flex-1 flex-col p-5 gap-5 h-full overflow-y-auto">
      <NavBar
        title="Perfil"
        opts={[]}
        selected={0}
        onValueChange={() => {}}
        center={""}
      />
      <div className="w-full flex justify-center mt-[10px]">
        <ProfileContainer
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          name="Juan Pérez"
          organization="Skilliket Inc."
          phone="555-123-4567"
          email="juan@example.com"
          passwordMask="••••••••"
          address="Av. Siempre Viva 742"
          onSave={(data) => {
            console.log("Datos guardados:", data);
          }}
        />
      </div>
      <div className="w-full flex justify-center mt-10 mb-4">
        <Buttons
          text="Log Out"
          color="login"
          onClick={handleLogout}
          className="max-w-md w-[200px]"
        />
      </div>
    </div>
  );
}
