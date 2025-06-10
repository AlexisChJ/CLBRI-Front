import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard/AuthGuard";
import Sidebar from "@/components/SideBar/SideBar";

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
    <AuthProvider>
      <AuthGuard>
        <Sidebar>{children}</Sidebar>
      </AuthGuard>
    </AuthProvider>
  );
}
