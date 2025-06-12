import api from "../api";
import { Classification } from "@/types/Classification";

export const getClassifications = async (firebaseToken: string): Promise<Classification[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.get("/classifications", config);
  return data;
};