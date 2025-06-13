import api from "../api";
import { Batch } from "@/types/Batch";

export interface BackendTspResponse {
  [key: string]: { 
    [locationString: string]: Batch[];
  };
}

export interface StepAssignment {
  [locationIdentifier: string]: Batch[]; 
}

export interface BackendTspAssignmentResponse {
  [stepIndex: string]: StepAssignment;
}

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

    for (const stepIndex in rawBackendResponse) {
      if (Object.prototype.hasOwnProperty.call(rawBackendResponse, stepIndex)) {
        const stepAssignment: StepAssignment = rawBackendResponse[stepIndex];
        for (const locationKey in stepAssignment) {
          if (Object.prototype.hasOwnProperty.call(stepAssignment, locationKey)) {
            const batchesForLocation: Batch[] = stepAssignment[locationKey];
          
            flattenedDeliveryOrder.push(...batchesForLocation);
          }
        }
      }
    }

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

    console.log("Estructura de respuesta (aplanada para frontend):", {
      hasDeliveryOrder: !!result.deliveryOrder,
      deliveryOrderLength: result.deliveryOrder?.length,
    });

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } catch (error: unknown) {
    console.error("Error en TSP:", error);
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { status?: unknown; data?: unknown } };
      console.error("Response status:", err.response?.status);
      console.error("Response data:", err.response?.data);
    }
    throw error;
  }
};