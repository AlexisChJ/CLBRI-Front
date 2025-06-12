import { EditUserData } from "@/types/EditUserData";
import api from "../api";
// eslint-disable-next-line react-hooks/exhaustive-deps
export const editUserData = async (firebaseToken: string, userData: EditUserData): Promise<any> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.post("/user/edituser", userData, config);
  return data;
};