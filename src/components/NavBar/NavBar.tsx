"use client";

import { Prompt } from "next/font/google";
import NotificationSVG from "@/assets/notification.svg";
import LogOut from "@/assets/log-out.svg"
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Notification } from "@/types/Notification";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const prompt_300 = Prompt({ weight: "300", subsets: ["latin"], preload: true })
const prompt_500 = Prompt({ weight: "500", subsets: ["latin"], preload: true })

export interface NotificationIconProps {
  notifications: Notification[];
}

const NotificationIcon = ({ notifications = [] }: NotificationIconProps) => {
  const [seen, setSeen] = useState<boolean>(false);

  useEffect(() => {
    setSeen(false);
  }, [notifications]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-end">
          <button
            className="w-auto h-fit aspect-auto selection:bg-transparent hover:cursor-pointer"
            onPointerDown={() => setSeen(true)}
          >
            <div className="relative w-5">
              <img src={NotificationSVG.src} />
              <div
                hidden={seen}
                className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"
              ></div>
            </div>
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        {notifications.length === 0 ? (
          <DropdownMenuItem>No hay nuevas notificaciones.</DropdownMenuItem>
        ) : (
          notifications.map((value, index) => (
            <DropdownMenuItem key={index}>
              <p>
                <b>{value?.title}</b>
                <br />
                <span>{value.description}</span>
                <br />
                <i className="text-gray-400 dark:text-gray-100">
                  {value?.creationDate?.toDateString()}
                </i>
              </p>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface NavBarProps {
  title: string;
  opts: any[];
  selected: number;
  notificaciones: Notification[];
  onValueChange: (index: number) => void;
  center?: React.ReactNode;
}

export const NavBar = ({
  title = "",
  opts = [],
  selected = 0,
  notificaciones = [],
  onValueChange = () => {},
  center,
}: NavBarProps) => {
  const [current, setCurrent] = useState<number>(selected);
  const router = useRouter();

  const handleLogout = () => {
      signOut(auth);
      router.push("/login");
    };

  return (
    <div className="w-full border-b border-blue-800 px-4 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-y-2 sm:gap-y-0">
        {/* Título y opciones */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 min-w-0">
          <span
            className={`${prompt_300.className} text-2xl sm:text-3xl truncate`}
          >
            {title}
          </span>
          <div className="flex flex-wrap gap-x-4">
            {opts.map((value, index) => (
              <button
                key={index}
                className={`${prompt_500.className} ${
                  current === index ? "text-[#3A70C3]" : "text-gray-600"
                } whitespace-nowrap`}
                onClick={() => {
                  onValueChange(index);
                  setCurrent(index);
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Centro */}
        <div className="hidden sm:flex justify-center">{center}</div>

        {/* Notificaciones */}
        <div className="flex justify-end">
          {/* <NotificationIcon notifications={notificaciones} /> */}

          <button
            className="hover:cursor-pointer"
            onClick={handleLogout}
          >
            <img src={LogOut.src} alt="Salir" />
          </button>
        </div>
      </div>

      {/* Centro para pantallas pequeñas (debajo del título y opciones) */}
      <div className="sm:hidden mt-2 flex justify-center">{center}</div>
    </div>
  );
};

export default NavBar;
