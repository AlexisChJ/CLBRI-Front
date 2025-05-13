"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { LayoutDashboard, CircleUser, PanelLeftClose, PanelRightClose,  Network, Menu } from "lucide-react"
import { BlueLogo } from "../LogoAzul/logoAzul"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Inventario", url: "/inventario", icon: Menu },
  { title: "Usuarios", url: "/usuarios", icon: Network },
  { title: "Perfil", url: "/perfil", icon: CircleUser },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Sidebar collapsible={"none"} className={clsx("transition-all duration-300 min-h-screen", collapsed ? "w-[80px]" : "w-[240px]")}>
      <SidebarContent className="flex flex-col justify-between h-full bg-black text-white">
      <SidebarGroup className="flex flex-col items-center justify-center gap-6 py-4 flex-1">
          <div className="h-[300px] flex items-center justify-center">
            {!collapsed && <BlueLogo />}
          </div>
          <SidebarGroupContent className="flex-1 w-full">
            <SidebarMenu className="flex flex-col">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <a
                      href={item.url}
                      className={clsx(
                        "group flex items-center gap-3 px-4 py-2 transition-colors duration-200",
                        "hover:text-blue-500",
                        collapsed ? "justify-center" : "justify-start"
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
          <button onClick={() => setCollapsed(!collapsed)} className="text-white p-2 hover:text-blue-500">
            {collapsed ? <PanelRightClose /> : <PanelLeftClose />}
          </button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
