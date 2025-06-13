import api from "../api";
import { Order } from "@/types/Order";
import { ManualDistributionRequestDTO, DistributionItem } from "@/types/Manual";
export const sendManualDistribution = async (
  distributions: DistributionItem[],
  firebaseToken: string
): Promise<Order[]> => { 
  try {
    console.log("🚀 Iniciando distribución manual con:", {
      distributionCount: distributions.length,
      distributions: distributions.map(d => ({ batchId: d.batchId, locationId: d.receivedByUserId }))
    });

    const config = {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
        "Content-Type": "application/json",
      },
    };

    const requestBody: ManualDistributionRequestDTO = {
      distributions: distributions,
    };

    const { data: createdOrders } = await api.post<Order[]>( // Especifica el tipo de respuesta
      "/batches/manualdistribution",
      requestBody,
      config
    );

    console.log("Respuesta de distribución manual completa:", createdOrders);
    return createdOrders;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } catch (error: any) {
    console.error("Error en distribución manual:", error);
    console.error("Response status:", error.response?.status);
    console.error("Response data:", error.response?.data);
    throw error;
  }
};
