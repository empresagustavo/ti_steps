


export type NotificationModel = {

    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    active?: boolean;

    read: boolean;
    title: string;
    message: string;
    userId: string;
};