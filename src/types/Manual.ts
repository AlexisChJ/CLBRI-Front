export interface DistributionItem {
  batchId: number; // El ID del batch a distribuir
  receivedByUserId: number; // El ID de la ubicación a la que se asigna
}

export interface ManualDistributionRequestDTO {
  distributions: DistributionItem[]; // La lista de asignaciones de batch a ubicación
}
