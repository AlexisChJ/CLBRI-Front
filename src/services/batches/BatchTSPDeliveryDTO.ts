import api from "../api";
import { Batch } from "@/types/Batch";

export interface BatchTSPDeliveryDTO {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  optimizedRoute?: unknown[];
  totalDistance?: number;
  deliveryOrder?: Batch[];
  executionTime?: number;
  success?: boolean;
  message?: string;
}

export const solveTSP = async (
  batches: Batch[], 
  firebaseToken: string
): Promise<BatchTSPDeliveryDTO> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };
  
  const { data } = await api.post("/tsp", batches, config);
  return data;
};