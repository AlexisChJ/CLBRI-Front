import api from "../api"

export const deleteBatch = async (id: number, firebaseToken: string): Promise<void> => {
  const config = {
    headers: { Authorization: `Bearer ${firebaseToken}` }
  }

  try {
    await api.delete(`/batches/deletebatch/${id}`, config)
  } catch (error) {
    console.error("Error al eliminar el batch:", error)
    throw error
  }
}