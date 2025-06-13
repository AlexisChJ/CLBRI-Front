import { Prediction } from "@/types/dashboard/Prediction";
import api from "../api";

export const getPredictions = async (firebaseToken: string): Promise<Prediction[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.get("/dashboard/prediction", config);
  return data;
};