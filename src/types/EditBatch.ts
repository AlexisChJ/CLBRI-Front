export interface EditBatch {
  description: string;
  entryDate: string;      
  expirationDate: string;  
  priority: "LOW" | "MID" | "HIGH";
  classification_id: number;
}