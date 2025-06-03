"use client";

import Buttons from "@/components/Buttons/Buttons";
import { BlueLogo } from "@/components/LogoAzul/logoAzul";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { SocialMedia } from "@/components/SocialMedia/SocialMedia";
import { TextInput } from "@/components/TextInput/TextInput";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Zen_Maru_Gothic } from "next/font/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/providers/AuthProvider";
import { isValidEmail, isValidPassword } from "@/utils/validators";

const zen_500 = Zen_Maru_Gothic({
  weight: "500",
  subsets: ["latin"],
  preload: true,
});

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

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
      router.push("/dashboard");
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
    <div className="flex">
      <div className="relative flex w-1/2 h-auto">
        <img
          className="h-screen object-cover"
          // @/assets/images/
          src="https://cdn1.matadornetwork.com/blogs/2/2018/12/colibri-Jiri-Hrebicek-shutterstock_1178773135.jpg"
          alt="CLBRI"
        />
        <div className="absolute inset-0 bg-[#3A70C3] opacity-55 z-10" />
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
              id="password"
              value={password}
              placeholder="Contraseña"
              hasError={passwordError}
              onChange={(e) => setPassword(e.target.value)}
            />

          {error && <p className="text-red-500">{error}</p>}
          <a
            href="https://www.dummies.com/book/technology/programming-web-design/general-programming-web-design/beginning-programming-all-in-one-for-dummies-2nd-edition-292091/"
            className={`${zen_500.className} underline text-[#9B9B9B] hover:text-[#3A70C3]`}
          >
            ¿Olvidaste tu contraseña?
          </a>
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
