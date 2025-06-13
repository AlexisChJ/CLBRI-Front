import { Batch } from "./Batch";

export interface BatchSave {
    message: string;
    processedBatches: Batch[];
}