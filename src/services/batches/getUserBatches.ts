import { Batch } from "@/types/Batch";
import api from "../api";

export const getBatches = async (firebaseToken: string): Promise<Batch[]> => {
    const config = {
        headers: { Authorization: `Bearer ${firebaseToken}` }
    };

    const { data } = await api.get(`/batches/getuserbatches`, config);
    return data;
};