"use client";

import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        if (!auth) return;
        signOut(auth);
        router.push("/login");
    }, [auth]);

    return <></>;
}