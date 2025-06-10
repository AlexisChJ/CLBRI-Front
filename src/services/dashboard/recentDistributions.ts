import { Distribution } from "@/types/dashboard/BatchLogs";
import api from "../api";

export const getRecentDistributions = async (firebaseToken: string): Promise<Distribution[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.get("/dashboard/users/distribution", config);
  return data;
};