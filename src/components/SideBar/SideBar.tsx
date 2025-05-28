import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const SIDEBAR_WIDTH = "w-64"; // 16rem, ajusta si tu sidebar es más ancho

const SideBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className={`fixed left-0 top-0 h-screen ${SIDEBAR_WIDTH} z-40`}>
        <AppSidebar />
      </div>
      <main className={`ml-64 flex-1 h-screen overflow-y-auto`}>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default SideBar;