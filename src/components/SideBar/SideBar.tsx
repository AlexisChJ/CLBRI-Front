"use client"

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";


const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
      </div>
      <main className="flex-1 h-screen overflow-y-auto">
          {children}
        </main>
    </SidebarProvider>
  );
};

export default SideBar;

