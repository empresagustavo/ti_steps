import type { SnackModel, SnackStats } from "@/models/snack/snack.model";
import { httpClient } from "../api";

export async function getAllSnacks(data: {startDate: Date, endDate: Date}): Promise<SnackModel[]> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).get<SnackModel[]>(`/snacks?cas=${data.startDate.toISOString()}&cae=${data.endDate.toISOString()}`);
    
    return res.data;
}

export async function getAllSnacksStats(data: {startDate: Date, endDate: Date}): Promise<SnackStats> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).get<SnackStats>(`/snacks/stats?cas=${data.startDate.toISOString()}&cae=${data.endDate.toISOString()}`);
    
    return res.data;
}

export async function createSnack({ date, isPaid, isPromised, type, userId }: SnackModel): Promise<SnackModel> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).post<SnackModel>(`/snacks`, { date, isPaid, isPromised, type, userId });
    
    return res.data;
}

export async function updateSnack({ id, date, isPaid, isPromised, type, userId }: SnackModel): Promise<SnackModel> {

    const res = await httpClient({
        "Content-type": "application/json", 
    }).put<SnackModel>(`/snacks/${id}`, { date, isPaid, isPromised, type, userId });
    
    return res.data;
}