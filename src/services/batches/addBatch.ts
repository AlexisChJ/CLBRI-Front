import { Batch } from "@/types/Batch";
import api from "../api";
import { AddBatch } from "@/types/AddBatch";

export const addBatch = async (batch: AddBatch, firebaseToken: string): Promise<Batch> => {
  const config = {
    headers: {
      Authorization: `Bearer ${firebaseToken}`,
      "Content-Type": "application/json"
    }
  };

  const { data } = await api.post("/batches/add", batch, config);
  return data;
};