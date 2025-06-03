"use client";

import { usePathname, useRouter } from "next/navigation";

import { protectedRoutes } from "@/utils/protectedRoutes";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

const loginRoute = "/login";


export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // Si la ruta es protegida y no hay usuario, redirige a login
      if (protectedRoutes.has(pathname) && !user) {
        router.push(loginRoute);
      }
      // Si está logueado y va a login o register, redirige dashboard
      if (user && (pathname === "/login" || pathname === "/register")) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  // Está linea causa que cambiar entre pantallas haya una pequeña "espera".
  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


  return <>{children}</>;
}
