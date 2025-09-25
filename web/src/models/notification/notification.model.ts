import type { NotificationContentModel } from "./notificationContent.model";



export type NotificationModel = {

    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;

    read?: boolean;
    userId?: string;
    contentId?: string;
    content?: NotificationContentModel;
};