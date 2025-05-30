import api from "../api"

export const getUserLocations = async (firebaseToken: string) => {
    const config = {
        headers: { Authorization: `Bearer ${firebaseToken}` }
    };

    const { data } = await api.get(`/admin/locations`, config);
    return data;
};