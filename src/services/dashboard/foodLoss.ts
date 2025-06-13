import { UserWaste } from "@/types/dashboard/BatchLogs";
import api from "../api";

export const getFoodLossData = async (firebaseToken: string): Promise<UserWaste[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.get("/dashboard/users/food_loss", config);
  return data;
};