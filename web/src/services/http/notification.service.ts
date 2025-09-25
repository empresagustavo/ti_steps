import type { NotificationModel } from "@/models/notification/notification.model";
import { httpClient } from "../api";



export async function getAllFromUser(userId: string): Promise<NotificationModel[]> {

    const result = await httpClient({
        "Content-type": "Application/json",
    }).get<NotificationModel[]>(`/notifications?userId=${userId}`);
    
    return result.data;
};

export async function read( { read, id }: NotificationModel): Promise<NotificationModel> {
    
    const result = await httpClient({
        "Content-type": "Application/json"
    }).put<NotificationModel>(`/notifications/${id}`, { read });

    return result.data;
}