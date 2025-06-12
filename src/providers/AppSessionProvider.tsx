"use client";

import { Notification } from "@/types/Notification";
import { createContext, useContext, useState } from "react";

interface AppContextProps {
    notifications: Notification[];
};

const AppSessionContext = createContext<AppContextProps>({
    notifications: []
});

export const AppSessionProvider = ({ children } : { children: React.ReactNode }) => {
    const [notifications] = useState<Notification[]>([]);

    return (
        <AppSessionContext.Provider value={{ notifications }}>
            {children}
        </AppSessionContext.Provider>
    )
}

export const useAppSession = () => useContext(AppSessionContext);