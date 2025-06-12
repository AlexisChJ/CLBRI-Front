import { UserRole } from "@/types/UserRole";
import api from "../api"

export const getUserRole = async (firebaseToken: string): Promise<UserRole> => {
    const config = {
        headers: { Authorization: `Bearer ${firebaseToken}` }
    };

    const { data } = await api.get("/user", config);
    return data;
}