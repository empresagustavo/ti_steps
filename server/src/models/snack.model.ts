import { UserModel } from "./user.model";

export type SnackStats = {
    totalPaid: number
    totalUnpaid: number
    totalPromised: number
    hungerZeroRanking: { user: string; count: number }[]   // Fome Zero
    freeloaderRanking: { user: string; count: number }[]   // Caloteiros
    afternoonSnackRanking: { user: string; count: number }[] // Ô Merenda
    promisedSnackRanking: { user: string; count: number }[] // Promessas
}

export type SnackModel = {

    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;

    description?: string | null;
    date: Date;
    isPromised: boolean;
    isPaid: boolean;
    userId?: string;
    user?: UserModel;
    type: "BREAKFAST" | "AFTERNOON";
} 