import { Batch } from "@/types/Batch";
import api from "../api";

export const getAvailableBatches = async (firebaseToken: string): Promise<Batch[]> => {
    const config = {
        headers: { Authorization: `Bearer ${firebaseToken}` }
    };

    const { data } = await api.get(`/batches/available`, config);
    return data;
};