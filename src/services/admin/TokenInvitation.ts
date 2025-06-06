import api from "../api";
import { TokenInvitation } from "@/types/TokenInvitation";
import { getAuth } from "firebase/auth";

export const TokenInvitationService = async (
  tokenInvitation: TokenInvitation
): Promise<{ token: string }> => {
  // Obtén el token del usuario autenticado
  const currentUser = getAuth().currentUser;
  if (!currentUser) throw new Error("Usuario no autenticado");
  const idToken = await currentUser.getIdToken();

  const tokenSend = {
    email: tokenInvitation.email,
  };
  const { data } = await api.post(
    `/admin/invitations`,
    tokenSend,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return data;
};