import api from "../api";
import { AddBatch } from "@/types/AddBatch";

export const addBatch = async (batch: AddBatch, firebaseToken: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  await api.post("/batches/add", batch, config);
};