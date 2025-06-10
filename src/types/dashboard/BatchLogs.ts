export interface UserWaste {
    user: DashboardUser
    wastedBatches: number
}

export interface Distribution {
    user: DashboardUser
    dateTime: string
}

export interface BatchLogEntry {
    user: DashboardUser,
    batchLogs: BatchLog[]
}

export interface BatchLog {
    id: number,
    stockBatches: number,
    wasteBatches: number,
    entryDate: Date
}

export interface DashboardUser {
    name: string
}