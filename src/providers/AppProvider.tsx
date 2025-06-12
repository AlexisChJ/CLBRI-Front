"use client";

import { Notification } from "@/types/Notification";
import { createContext, useContext, useState } from "react";

interface AppContextProps {
    notifications: Notification[];
};

const AppContext = createContext<AppContextProps>({
    notifications: []
});

export const AppProvider = ({ children } : { children: React.ReactNode }) => {
    const [notifications] = useState<Notification[]>([]);

    return (
        <AppContext.Provider value={{ notifications }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppData = () => useContext(AppContext);