import { UserWaste } from "@/types/dashboard/BatchLogs";
import api from "../api";
import { Timespan } from "@/types/dashboard/Timespan";

export const getFoodLossData = async (timespan: Timespan, firebaseToken: string): Promise<UserWaste[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.post("/dashboard/users/food_loss", timespan, config);
  return data;
};