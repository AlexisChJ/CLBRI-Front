import { Timespan } from "@/types/dashboard/Timespan";
import api from "../api";
import { BatchLogEntry } from "@/types/dashboard/BatchLogs";

export const getBatchLogs = async (timespan: Timespan, firebaseToken: string): Promise<BatchLogEntry[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.post("/dashboard/batch_logs", timespan, config);
  return data;
};