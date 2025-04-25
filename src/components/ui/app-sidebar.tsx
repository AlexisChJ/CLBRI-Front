"use client"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { LayoutDashboard, CircleUser , Menu, Network } from "lucide-react"
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
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Inventario",
      url: "/inventario",
      icon: Menu,
    },
    {
      title: "Usuarios",
      url: "/usuarios",
      icon: Network,
    },
    {
      title: "Perfil",
      url: "/perfil",
      icon: CircleUser,
    },
  ]

  export function AppSidebar() {
    const pathname = usePathname()
    return (
      <Sidebar>
        <SidebarContent className="flex flex-col justify-center h-full bg-black text-white">
          <SidebarGroup className="flex flex-col items-center gap-6">
            <BlueLogo />  
            <SidebarGroupContent className="flex-1">
              <SidebarMenu className="flex flex-col">
              {items.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <a
                      href={item.url}
                      className={clsx(
                        "group flex items-center justify-left gap-3 px-4 py-2 transition-colors duration-200",
                        "hover:text-blue-500"
                      )}
                    >
                      <item.icon className="w-7 h-7 stroke-current" />
                      <span className="text-base font-large">{item.title}</span>
                    </a>
                  </SidebarMenuItem>
                )
              })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  }
  