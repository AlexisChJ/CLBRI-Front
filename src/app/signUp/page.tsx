"use client";

import Buttons from "@/components/Buttons/Buttons";
import { SwitchDemo } from "@/components/Switch/Switch";
import { CountryCombobox } from "@/components/CountryCombobox/CountryCombobox";
import { WhiteLogo } from "@/components/LogoBlanco/LogoBlanco";
import { PasswordInput } from "@/components/PasswordInput/PasswordInput";
import { TextInput } from "@/components/TextInput/TextInput";
import { Red_Hat_Display, Zen_Maru_Gothic } from "next/font/google";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SheetLeft } from "@/components/Eula/Eula";
import { signUpUser } from "@/services/signUp/signUpUser";

import {
  isValidEmail,
  isValidPassword,
  isAlphanumeric,
  isAddress,
  isNumeric,
  isAlphanumericToken,
} from "@/utils/validators";

const redhat_700 = Red_Hat_Display({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});


const zen_500 = Zen_Maru_Gothic({
  weight: "500",
  subsets: ["latin"],
  preload: true,
});


const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState<boolean>(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState<boolean>(false);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState<boolean>(false);
  const [state, setState] = useState("");
  const [stateError, setStateError] = useState<boolean>(false);
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [postalCodeError, setPostalCodeError] = useState<boolean>(false);
  const [adminToken, setAdminToken] = useState("");
  const [adminTokenError, setAdminTokenError] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false); // Add state for switch
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    // TODO: Falta validación de correo y contraseña
    // FALTA validación de correo y contraseña
    // FALTA número telefónico
    if (!isAdmin) {
      try {
          signUpUser({
            first_name: name,
            last_name: lastname,
            email: email,
            password: password,
            workplace: "",
            phone_number: "", // FALTA
            address: address,
            city: city,
            state: state,
            postal_code: postalCode,
            country: country,
            admin_token: adminToken
          });
          router.push("/");
      } catch (err) {
        console.error(err);
        // Marcar como erroneo el registro.
      }
    } else {
      console.log("Registro de admin no se ha implementado aun");
    }
  };

  const onCountryChange = (ctry: string) => {
    setCountry(ctry);
  }

  const validateEmail = (value: string): boolean => {
    const valid = isValidEmail(value);
    setEmailError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validatePassword = (value: string): boolean => {
    const valid = isValidPassword(value);
    setPasswordError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validateConfirmPassword = (value: string): boolean => {
    const valid = isValidPassword(value);
    setConfirmPasswordError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validateName = (value: string): boolean => {
    const valid = isAlphanumeric(value);
    setNameError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validateLastName = (value: string): boolean => {
    const valid = isAlphanumeric(value);
    setLastnameError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validateAddress = (value: string): boolean => {
    const valid = isAddress(value);
    setAddressError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validateCity = (value: string): boolean => {
    const valid = isAlphanumeric(value);
    setCityError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validateState = (value: string): boolean => {
    const valid = isAlphanumeric(value);
    setStateError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validatePostalCode = (value: string): boolean => {
    const valid = isNumeric(value);
    setPostalCodeError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const validateAdminToken = (value: string): boolean => {
    const valid = isAlphanumericToken(value);
    setAdminTokenError(!valid);
    if (!valid) setError("Credenciales incorrectas.");
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // limpia errores anteriores

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isNameValid = validateName(name);
    const isLastNameValid = validateLastName(lastname);
    const isAddressValid = validateAddress(address);
    const isCityValid = validateCity(city);
    const isStateValid = validateState(state);
    const isPostalCodeValid = validatePostalCode(postalCode);
    const isAdminTokenValid = validateAdminToken(adminToken);

    if (
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid ||
      !isNameValid ||
      !isLastNameValid ||
      !isAddressValid ||
      !isCityValid ||
      !isStateValid ||
      !isPostalCodeValid ||
      !isAdminTokenValid
    ) {
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!isAdmin) {
      try {
        signUpUser({
          first_name: name,
          last_name: lastname,
          email: email,
          password: password,
          workplace: "",
          phone_number: "", // FALTA
          address: address,
          city: city,
          state: state,
          postal_code: postalCode,
          country: country,
          admin_token: adminToken
        });
        router.push("/");
      } catch (err) {
        console.error(err);
        // Marcar como erroneo el registro.
      }
    }

    router.push("/login");
  };

  const goBack = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Imagen de fondo */}
      <div className="relative flex w-1/2 min-h-screen">
        <Image
          className="w-full h-full object-cover"
          src="https://cdn1.matadornetwork.com/blogs/2/2018/12/colibri-Jiri-Hrebicek-shutterstock_1178773135.jpg"
          alt="CLBRI"
          fill
          priority
          sizes="50vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-[#3A70C3] opacity-55 z-10" />
        <div className="absolute bottom-[50px] w-full flex justify-center z-20">
          <WhiteLogo />
        </div>
      </div>

      {/* Formulario */}
      <div className="flex flex-col justify-center text-center mx-auto w-full max-w-md gap-7 p-6">
        <div className="relative w-full flex items-center justify-center">
          <button
            onClick={goBack}
            className={`${zen_500.className} text-[#3A70C3] absolute left-0 text-sm hover:underline hover:cursor-pointer`}
          >
            &lt; Regresar
          </button>
          <h4 className={`${redhat_700.className} text-[#3A70C3] text-4xl`}>
            Registro
          </h4>
        </div>

        <TextInput
          value={email}
          placeholder="Correo"
          hasError={emailError}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative group w-full">
          <PasswordInput
            id="password"
            value={password}
            placeholder="Contraseña"
            hasError={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute left-0 -bottom-6 w-max bg-gray-700 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Mínimo 8 caracteres, una mayúscula, una minúscula, un número y un
            símbolo
          </div>
        </div>
        <PasswordInput
          value={confirmPassword}
          placeholder="Confirmar contraseña"
          hasError={confirmPasswordError}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="flex gap-4">
          <TextInput
            value={name}
            placeholder="Nombre"
            hasError={nameError}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            value={lastname}
            placeholder="Apellidos"
            hasError={lastnameError}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <TextInput
          value={address}
          placeholder="Dirección"
          hasError={addressError}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="flex gap-4">
          <TextInput
            value={city}
            placeholder="Ciudad"
            hasError={cityError}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextInput
            value={state}
            placeholder="Estado"
            hasError={stateError}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <TextInput
            value={postalCode}
            placeholder="Código Postal"
            hasError={postalCodeError}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <CountryCombobox onCountryChange={onCountryChange} />
        </div>

        <div className="flex gap-4">
          {/* Pass checked and onCheckedChange to SwitchDemo */}
          <SwitchDemo checked={isAdmin} onCheckedChange={setIsAdmin} />
          <TextInput
            value={adminToken}
            placeholder="Token de Administrador"
            hasError={adminTokenError}
            onChange={(e) => setAdminToken(e.target.value)}
            disabled={isAdmin} // Disable input if switch is ON
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <SheetLeft />

        <Buttons color="login" text="Registrarse" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default SignUpPage;
