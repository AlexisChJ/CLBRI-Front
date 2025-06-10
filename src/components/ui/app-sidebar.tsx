"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  CircleUser,
  PanelLeftClose,
  PanelRightClose,
  Network,
  Route,
  Menu,
  Bird,
} from "lucide-react";
import { BlueLogo } from "../LogoAzul/logoAzul";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { useAuth } from "@/providers/AuthProvider";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Inventario", url: "/inventario", icon: Menu },
  { title: "Distribución", url: "/distribucionUsuarios", icon: Network },
  { title: "Locaciones", url: "/usuariosLocaciones", icon: Route },
  { title: "Usuario", url: "/usuario", icon: Bird },
  { title: "Perfil", url: "/perfil", icon: CircleUser },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useAuth();
  const [collapsed, setCollapsed] = useState(true);

  const filteredItems = (() => {
    if (role === "admin") {
      return items.filter((item) => item.title !== "Usuario");
    }
    if (role === "user") {
      return items.filter(
        (item) => item.title === "Usuario" || item.title === "Perfil"
      );
    }
    return []; // si no hay rol definido, no muestra nada
  })();

  return (
    <Sidebar
      collapsible={"none"}
      className={clsx(
        "transition-all duration-500 ease-in-out h-full",
        collapsed ? "w-[80px]" : "w-[240px]"
      )}
    >
      <SidebarContent className="relative flex flex-col h-full bg-black text-white transition-all duration-500 ease-in-out overflow-y-auto">
        <div
          className={clsx(
            "flex items-center justify-center transition-all duration-500 ease-in-out overflow-hidden",
            collapsed ? "h-[100px]" : "h-[200px]"
          )}
        >
          <div className="flex items-center justify-center h-full">
            <BlueLogo
              className={clsx(
                "transition-all duration-500 ease-in-out",
                collapsed ? "w-10" : "w-36"
              )}
            />
          </div>
        </div>

        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-2">
          <SidebarGroupContent className="w-full flex justify-center">
            <SidebarMenu
              className={clsx(
                "flex flex-col gap-2 transition-all duration-500 ease-in-out"
              )}
              style={{
                width: collapsed ? "100%" : "180px",
              }}
            >
              {filteredItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <a
                      href={item.url}
                      className={clsx(
                        "group flex items-center gap-3 px-4 py-2 transition-all duration-300 ease-in-out",
                        collapsed ? "justify-center" : "justify-start",
                        collapsed ? "w-full" : "w-auto",
                        isActive
                          ? "text-blue-500"
                          : "text-white hover:text-blue-500"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          "w-6 h-6 stroke-current transition-all duration-300",
                          isActive
                            ? "text-blue-500"
                            : "text-white group-hover:text-blue-500"
                        )}
                      />
                      <span
                        className={clsx(
                          "text-base font-medium transition-all duration-300 ease-in-out",
                          collapsed
                            ? "opacity-0 w-0 overflow-hidden"
                            : "opacity-100 w-auto",
                          isActive
                            ? "text-blue-500"
                            : "text-white group-hover:text-blue-500"
                        )}
                      >
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[80px] flex items-center justify-center transition-all duration-500">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white p-2 hover:text-blue-500 transition-all duration-100"
          >
            {collapsed ? <PanelRightClose /> : <PanelLeftClose />}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
