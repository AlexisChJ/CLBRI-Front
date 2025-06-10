import { BatchLogEntry } from "@/types/dashboard/BatchLogs";
import { FoodLossGraphData, FoodStockGraphData } from "@/types/dashboard/Graph";

export function GroupFoodLossData(batchLogEntry: BatchLogEntry[]) {
    const foodLoss: FoodLossGraphData[] = [
        { month: "Ene.", waste: 0 },
        { month: "Feb.", waste: 0 },
        { month: "Mar.", waste: 0 },
        { month: "Abr.", waste: 0 },
        { month: "May.", waste: 0 },
        { month: "Jun.", waste: 0 },
        { month: "Jul.", waste: 0 },
        { month: "Ago.", waste: 0 },
        { month: "Sep.", waste: 0 },
        { month: "Oct.", waste: 0 },
        { month: "Nov.", waste: 0 },
        { month: "Dec.", waste: 0 },
    ];

    batchLogEntry.forEach((entry) => {
        entry.batchLogs.forEach((log) => {
            const logMonth = new Date(log.entryDate).getMonth();
            foodLoss[logMonth].waste += log.wasteBatches;
        });
    });

    return foodLoss;
}

export function GroupFoodStockData(batchLogEntry: BatchLogEntry[]) {
    const foodStock: FoodStockGraphData[] = [
        { month: "Ene.", stock: 0 },
        { month: "Feb.", stock: 0 },
        { month: "Mar.", stock: 0 },
        { month: "Abr.", stock: 0 },
        { month: "May.", stock: 0 },
        { month: "Jun.", stock: 0 },
        { month: "Jul.", stock: 0 },
        { month: "Ago.", stock: 0 },
        { month: "Sep.", stock: 0 },
        { month: "Oct.", stock: 0 },
        { month: "Nov.", stock: 0 },
        { month: "Dec.", stock: 0 },
    ];

    batchLogEntry.forEach((entry) => {
        entry.batchLogs.forEach((log) => {
            const logMonth = new Date(log.entryDate).getMonth();
            foodStock[logMonth].stock += log.stockBatches;
        });
    })

    return foodStock;
}