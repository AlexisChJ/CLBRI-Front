"use client";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/NavBar/NavBar";
import ProfileContainer from "@/components/ProfileContainer/ProfileContainer";
import { useRouter } from "next/navigation";
import Buttons from "@/components/Buttons/Buttons";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { editUserData } from "@/services/user/editUserData";
import { getUserData } from "@/services/user/showData";
import { UserShowData } from "@/types/ShowUserData";

export default function Perfil() {
  const { user } = useAuth();
  const router = useRouter();

  const [userData, setUserData] = useState<UserShowData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const token = await user.getIdToken();
      const data = await getUserData(token);
      setUserData(data);
    };

    fetchData();
  }, [user]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response === "object"
      ) {
        console.error("Backend error:", (err as any).response.data);
        console.error("Status:", (err as any).response.status);
      } else if (
        typeof err === "object" &&
        err !== null &&
        "request" in err
      ) {
        console.error("No response received:", (err as any).request);
      } else if (
        typeof err === "object" &&
        err !== null &&
        "message" in err
      ) {
        console.error("Error en la petición:", (err as any).message);
      } else {
        console.error("Unknown error:", err);
      }
    }
  };


  if (!user || !userData) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Saliendo de la cuenta</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col p-5 gap-5 h-full overflow-y-auto">
      <NavBar
        title="Perfil"
        selected={0}
        onValueChange={() => {}}
        center={""}
      />
      <div className="w-full flex justify-center mt-[10px]">
        <ProfileContainer
          avatarSrc="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
          name={userData?.name || ""}
          workplace={userData?.workplace || ""}
          phone={userData?.phoneNumber || ""}
          email={userData?.email || ""}
          address={userData?.location?.address || ""}
          city={userData?.location?.city || ""}
          state={userData?.location?.state || ""}
          country={userData?.location?.country || ""}
          postal_code={userData?.location?.postalCode || ""}
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
