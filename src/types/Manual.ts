export interface DistributionItem {
  batchId: string; // El ID del batch a distribuir
  locationId: string; // El ID de la ubicación a la que se asigna
}

export interface ManualDistributionRequestDTO {
  sentByAdminId: string; // El ID del administrador que realiza la distribución
  distributions: DistributionItem[]; // La lista de asignaciones de batch a ubicación
}
