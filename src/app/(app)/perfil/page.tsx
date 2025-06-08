"use client";
import { NavBar } from "@/components/NavBar/NavBar";
import { Prompt } from "next/font/google";
import ProfileContainer from "@/components/ProfileContainer/ProfileContainer";
import { useRouter } from "next/navigation";
import Buttons from "@/components/Buttons/Buttons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { editUserData } from "@/services/user/editUserData";

const prompt = Prompt({ weight: ["500"], subsets: ["latin"], preload: true });

export default function Perfil() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth);
    router.push("/login");
  };

    const handleSaveChanges = async (data: {
    name: string;
    email: string;
    phone: string;
    workplace: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  }) => {
    try {
      if (!user) return;
      const firebaseToken = await user.getIdToken();
      const payload = {
        name: data.name,
        email: data.email,
        workplace: data.workplace,
        phone_number: data.phone,
        location: {
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          postal_code: data.postal_code
        }
      };
      await editUserData(firebaseToken, payload);
      console.log("Cambios guardados con éxito");
    }
    catch (err: any) {
      if (err.response) {
        console.error("Backend error:", err.response.data);
        console.error("Status:", err.response.status);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error en la petición:", err.message);
      }
    }
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
          workplace="Skilliket Inc."
          phone="555-123-4567"
          email="juan@example.com"
          address="Av. Siempre Viva 742"
          city="Springfield"
          state="IL"
          country="USA"
          postal_code="62704"
          onSave={handleSaveChanges}
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
