import api from "../api";
import { Batch } from "@/types/Batch";

// Define the response type based on your Java endpoint
export interface BatchTSPDeliveryDTO {
  // Ajusta estas propiedades según lo que devuelve tu BatchTSPDeliveryDTO en Java
  optimizedRoute?: any[];
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