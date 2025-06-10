import api from "../api";
import { UserShowData } from "@/types/ShowUserData";

export const getUserData = async (firebaseToken: string): Promise<UserShowData> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      Accept: "application/json"
    }
  };

  const { data } = await api.get("/user/showdata", config);
  return data;
};