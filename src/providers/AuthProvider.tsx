"use client";

import { auth } from "@/lib/firebase";
import { User, getIdToken, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    idToken: string | null;
    role: string | null;
};

const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    idToken: null,
    role: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [idToken, setIdToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
                try {
                    const token = await getIdToken(firebaseUser);
                    setIdToken(token);

                    setRole('client');
                    // SI EXISTE UNA SESION, OBTENER EL ROL DE ALGUN STORAGE
                } catch (err) {
                    console.error(err);
                    setIdToken(null);
                    setRole(null);
                }
            } else {
                setIdToken(null);
                setRole(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();

    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, idToken, role }}>
            {children}
        </AuthContext.Provider>
    )
}

// crear hook para consumir más facil el contexto
export const useAuth = () => useContext(AuthContext);