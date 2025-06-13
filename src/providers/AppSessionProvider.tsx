"use client";

import { useUserLocations } from "@/hooks/use-user-locations";
import { Notification } from "@/types/Notification";
import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import { UserLocation } from "@/types/UserLocation";

interface AppContextProps {
    notifications: Notification[];
    fetchedUserLocations: UserLocation[];
};

const AppSessionContext = createContext<AppContextProps>({
    notifications: [],
    fetchedUserLocations: []
});

export const AppSessionProvider = ({ children } : { children: React.ReactNode }) => {
    const [notifications] = useState<Notification[]>([]);
    const { user } = useAuth();
    const { userLocations } = useUserLocations(user);

    return (
        <AppSessionContext.Provider value={{ notifications, fetchedUserLocations: userLocations }}>
            {children}
        </AppSessionContext.Provider>
    )
}

export const useAppSession = () => useContext(AppSessionContext);