import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/SideBar/SideBar";
import { AppSessionProvider } from "@/providers/AppSessionProvider";

export const metadata: Metadata = {
  title: "CLBRi",
  description: "CLBRi App",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppSessionProvider>
      <Sidebar>{children}</Sidebar>
    </AppSessionProvider>
  );
}
