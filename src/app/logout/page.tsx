"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) return;
        signOut(auth);
        router.push("/login");
    }, [user]);

    return <></>;
}