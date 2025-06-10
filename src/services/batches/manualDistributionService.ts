import api from "../api";
import { Batch } from "@/types/Batch";
import { UserLocation } from "@/types/UserLocation";
import { Order } from "@/types/Order";
import { ManualDistributionRequestDTO, DistributionItem } from "@/types/Manual";
export const sendManualDistribution = async (
  adminId: string,
  distributions: DistributionItem[],
  firebaseToken: string
): Promise<Order[]> => { 
  try {
    console.log("🚀 Iniciando distribución manual con:", {
      adminId,
      distributionCount: distributions.length,
      distributions: distributions.map(d => ({ batchId: d.batchId, locationId: d.locationId }))
    });

    const config = {
      headers: {
        Authorization: `Bearer ${firebaseToken}`,
        "Content-Type": "application/json",
      },
    };

    const requestBody: ManualDistributionRequestDTO = {
      sentByAdminId: adminId,
      distributions: distributions,
    };

    const { data: createdOrders } = await api.post<Order[]>( // Especifica el tipo de respuesta
      "/manualdistribution",
      requestBody,
      config
    );

    console.log("✅ Respuesta de distribución manual completa:", createdOrders);
    return createdOrders;
  } catch (error: any) {
    console.error("❌ Error en distribución manual:", error);
    console.error("📄 Response status:", error.response?.status);
    console.error("📝 Response data:", error.response?.data);
    throw error;
  }
};
