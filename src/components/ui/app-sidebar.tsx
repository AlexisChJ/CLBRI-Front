"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { LayoutDashboard, CircleUser, PanelLeftClose, PanelRightClose, Network, Menu } from "lucide-react"
import { BlueLogo } from "../LogoAzul/logoAzul"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Inventario", url: "/inventario", icon: Menu },
  { title: "Usuarios", url: "/distribucionUsuarios", icon: Network },
  { title: "Perfil", url: "/perfil", icon: CircleUser },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sidebar collapsible={"none"} className={clsx("transition-all duration-300 h-full", collapsed ? "w-[80px]" : "w-[240px]")}>
      <SidebarContent className="flex flex-col h-full bg-black text-white">
          <div
            className={clsx(
              "flex items-center justify-center pt-[env(safe-area-inset-top)] py-4 min-h-[150px]",
              collapsed ? "min-h-[60px]" : "min-h-[240px]"
            )}>
            <BlueLogo className={collapsed ? "w-10" : "w-36"} />
          </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <SidebarGroupContent className="w-full flex justify-center">
            <SidebarMenu
              className="flex flex-col gap-2"
              style={{
                width: collapsed ? "100%" : "180px", // ancho fijo cuando expandido
              }}
            >
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <a
                      href={item.url}
                      className={clsx(
                        "group flex items-center gap-3 px-4 py-2 transition-colors duration-200",
                        "hover:text-blue-500",
                        collapsed ? "justify-center" : "justify-start",
                        collapsed ? "w-full" : "w-auto"
                      )}
                    >
                      <item.icon className="w-6 h-6 stroke-current" />
                      {!collapsed && (
                        <span className="text-base font-medium">{item.title}</span>
                      )}
                    </a>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </div>

        <div className="h-[80px] flex items-center justify-center w-full">
          <button onClick={() => setCollapsed(!collapsed)} className="text-white p-2 hover:text-blue-500">
            {collapsed ? <PanelRightClose /> : <PanelLeftClose />}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
