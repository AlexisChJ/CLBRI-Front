// @/services/batches/tspService.ts
import api from "../api";
import { Batch } from "@/types/Batch";
import { UserLocation } from "@/types/UserLocation"; 

export interface BackendTspResponse {
  [key: string]: { 
    [locationString: string]: Batch[];
  };
}

export interface StepAssignment {
  [locationIdentifier: string]: Batch[]; 
}

export interface BackendTspAssignmentResponse {
  // The outer object which contains numeric keys
  [stepIndex: string]: StepAssignment;
}


// The DTO that your component expects (with a flat deliveryOrder)
export interface BatchTSPDeliveryDTO {
  optimizedRoute?: any[];
  totalDistance?: number;
  deliveryOrder?: Batch[]; // This will be the flattened list
  executionTime?: number;
  success?: boolean;
  message?: string;
}

export const solveTSP = async (
  batches: Batch[],
  firebaseToken: string
): Promise<BatchTSPDeliveryDTO> => {
  try {
    console.log("🚀 Iniciando TSP con:", {
      batchCount: batches.length,
      batches: batches.map((b) => ({
        id: b.id,
        description: b.description,
        sku: b.sku,
        priority: b.priority,
      })),
    });

    const config = {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
        "Content-Type": "application/json",
      },
    };

    // Cast the data to BackendTspAssignmentResponse as per the console log
    const { data: rawBackendResponse } = await api.post<BackendTspAssignmentResponse>(
      "/batches/tsp",
      batches,
      config
    );

    console.log("✅ Respuesta TSP completa (raw):", rawBackendResponse);

    const flattenedDeliveryOrder: Batch[] = [];

    // Iterate over the numeric keys of the main response object
    for (const stepIndex in rawBackendResponse) {
      if (Object.prototype.hasOwnProperty.call(rawBackendResponse, stepIndex)) {
        const stepAssignment: StepAssignment = rawBackendResponse[stepIndex];

        // Now, iterate over the single key (location string) within each stepAssignment
        for (const locationKey in stepAssignment) {
          if (Object.prototype.hasOwnProperty.call(stepAssignment, locationKey)) {
            const batchesForLocation: Batch[] = stepAssignment[locationKey];
            
            // This is where the error was: ensure batchesForLocation is an array
            // It seems it is, but if it's not, the error occurs.
            // Push all batches from this location into the flattened list
            flattenedDeliveryOrder.push(...batchesForLocation);
          }
        }
      }
    }

    // Opcional: Ordenar los batches aplanados si necesitas un orden específico
    flattenedDeliveryOrder.sort((a, b) => {
      const priorityOrder = { 'HIGH': 0, 'MEDIUM': 1, 'LOW': 2, 'NORMAL': 3 };
      const pA = priorityOrder[a.priority as keyof typeof priorityOrder] ?? 99;
      const pB = priorityOrder[b.priority as keyof typeof priorityOrder] ?? 99;

      if (pA !== pB) return pA - pB;

      if (a.expirationDate && b.expirationDate) {
          return new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime();
      }
      return 0;
    });

    const result: BatchTSPDeliveryDTO = {
      deliveryOrder: flattenedDeliveryOrder,
      success: true,
      message: "Distribución automática procesada en el frontend.",
    };

    console.log("📊 Estructura de respuesta (aplanada para frontend):", {
      hasDeliveryOrder: !!result.deliveryOrder,
      deliveryOrderLength: result.deliveryOrder?.length,
    });

    return result;
  } catch (error: any) {
    console.error("❌ Error en TSP:", error);
    console.error("📄 Response status:", error.response?.status);
    console.error("📝 Response data:", error.response?.data);
    throw error;
  }
};