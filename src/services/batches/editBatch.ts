import { EditBatch } from "@/types/EditBatch";
import api from "../api";
// eslint-disable-next-line react-hooks/exhaustive-deps
export const editBatch = async (batchId: number, firebaseToken: string, batchData: EditBatch): Promise<unknown> => {
  console.log("=== EDIT BATCH SERVICE DEBUG ===");
  console.log("Batch ID:", batchId);
  console.log("Token length:", firebaseToken.length);
  console.log("Batch data:", batchData);
  
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json",
    },
  };
  
  try {
    const endpoint = `/batches/editbatch?id=${encodeURIComponent(batchId)}`;
    console.log("Full endpoint URL:", endpoint);
    
    const { data } = await api.post(endpoint, batchData, config);
    
    console.log("Edit batch successful:", data);
    return data;
  } catch (error) {
    console.error("Edit batch service error:", error);
    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response: any };
      console.error("Response status:", err.response.status);
      console.error("Response data:", err.response.data);
      console.error("Response headers:", err.response.headers);
    }
    throw error;
  }
};