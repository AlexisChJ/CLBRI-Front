import api from "../api";
import { BatchLogEntry } from "@/types/dashboard/BatchLogs";

export const getBatchLogs = async (firebaseToken: string): Promise<BatchLogEntry[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.get("/dashboard/batch_logs", config);
  return data;
};