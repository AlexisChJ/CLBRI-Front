"use client";

import Buttons from "@/components/Buttons/Buttons";
import { BlueLogo } from "@/components/LogoAzul/logoAzul";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { SocialMedia } from "@/components/SocialMedia/SocialMedia";
import { TextInput } from "@/components/TextInput/TextInput";
import { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Zen_Maru_Gothic } from "next/font/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { isValidEmail} from "@/utils/validators";
import Colibri from "@/assets/images/colbri.jpeg";
import Image from "next/image";

const zen_500 = Zen_Maru_Gothic({
  weight: "500",
  subsets: ["latin"],
  preload: true,
});

export default function LoginPage() {
  const router = useRouter();
  const { user, loading} = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const validateEmail = (value: string): boolean => {
    const valid = isValidEmail(value);
    setEmailError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validatePassword = (value: string): boolean => {
    const valid = true;
    if (value.length < 6) {
      console.log("La contraseña debe tener al menos 6 caracteres.");
    }
    // const valid = isValidPassword(value);
    setPasswordError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // limpia errores anteriores

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Credenciales incorrectas.");
      console.error("Login error:", err);
    }
  };

  const handleSignUp = () => {
    router.push("/signUp");
  };

  if (user || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="flex h-screen">
      <div className="relative flex w-1/2 h-auto">
        <Image
          className="w-full h-full object-cover"
          src={Colibri}
          alt="CLBRI"
          fill
          priority
          sizes="50vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute flex bottom-[25px] w-full justify-center z-20">
          <SocialMedia />
        </div>
      </div>
      <div className="flex flex-col justify-center w-1/2 h-auto">
        <div className="flex flex-col mx-auto w-3/5 gap-7 text-center">
          <BlueLogo className="w-40" />
          <TextInput
            id="email"
            value={email}
            placeholder="Correo"
            hasError={emailError}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
          />
          <PasswordInput
            id="password"
            value={password}
            placeholder="Contraseña"
            hasError={passwordError}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}
          <Buttons
            className=""
            text={"Iniciar Sesión"}
            color="login"
            onClick={handleLogin}
          />
          <p className={`${zen_500.className} text-[#9B9B9B]`}>
            ¿No tienes una cuenta?
          </p>
          <Buttons
            text={"Registrarse"}
            color="register"
            onClick={handleSignUp}
          />
        </div>
      </div>
    </div>
  );
}
