export interface DistributionItem {
  batchId: string;
  locationId: string; 
}

export interface ManualDistributionRequestDTO {
  sentByAdminId: string; 
  distributions: DistributionItem[]; 
}
