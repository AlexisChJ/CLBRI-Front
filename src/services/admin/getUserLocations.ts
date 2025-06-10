import { GetUserLocation } from "@/types/UserLocation";
import api from "../api"

export const getUserLocations = async (firebaseToken: string): Promise<GetUserLocation[]> => {
    const config = {
        headers: { Authorization: `Bearer ${firebaseToken}` }
    };

    const { data } = await api.get(`/admin/locations`, config);
    return data;
};