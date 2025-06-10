import axios from "axios";
import { Batch } from "@/types/Batch"; 
import api from "../api"; 

export interface BatchUpdateStatusDTO {
  id: number;
  received: boolean;
}

export const getBatches = async (firebaseToken: string): Promise<Batch[]> => {
    const config = {
        headers: { Authorization: `Bearer ${firebaseToken}` }
    };

    const { data } = await api.get(`/batches/getuserbatches`, config);
    return data;
};

export const updateBatchReceivedStatus = async (
  updates: BatchUpdateStatusDTO[],
  firebaseToken: string
): Promise<Batch[]> => {
  const config = {
    headers: { Authorization: `Bearer ${firebaseToken}` }
  };

  try {
    const { data } = await api.post(`/batches/save`, updates, config);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error updating batch status:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to update batches');
    } else {
      console.error("An unexpected error occurred:", error);
      throw new Error('An unexpected error occurred');
    }
  }
};