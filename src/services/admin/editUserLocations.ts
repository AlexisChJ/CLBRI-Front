import { EditUserData, EditedUserResponse } from "@/types/AdminEditUserData";
import api from "../api";

export const editUserByAdmin = async (
  firebaseToken: string,
  data: EditUserData
): Promise<EditedUserResponse> => {
  const config = {
    headers: { Authorization: `Bearer ${firebaseToken}` },
  };

  const response = await api.post<EditedUserResponse>(`/edit-user`, data, config);
  return response.data;
};
