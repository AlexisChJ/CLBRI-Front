"use client"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { LayoutDashboard, CircleUser , Menu, Network } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
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
          <SidebarGroup>
            <SidebarGroupLabel className="text-white">CLBRI</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = pathname === item.url
  
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={clsx(
                            "group flex items-center gap-2 px-4 py-2 transition-colors duration-200",
                            isActive
                              ? "text-blue-500"
                              : "text-white hover:text-blue-500"
                          )}
                        >
                          <item.icon
                            className={clsx(
                              "stroke-current",
                              isActive
                                ? "stroke-blue-500"
                                : "stroke-white group-hover:stroke-blue-500"
                            )}
                          />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
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
  