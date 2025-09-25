import type { NotificationModel } from "@/models/notification/notification.model";
import { getAllFromUser, read } from "@/services/http/notification.service";
import { useMutation } from "@tanstack/react-query";


export function useFindAllNotifications(onSuccess: (data: NotificationModel[]) => void, onError: (err: any) => void) {
    return useMutation<NotificationModel[], Error, string>({
        mutationFn: getAllFromUser,
        onSuccess,
        onError,
    })
}

export function useSetNotificationRead(onSuccess: (data: NotificationModel) => void, onError: (err: any) => void) {
    return useMutation<NotificationModel, Error, NotificationModel>({
        mutationFn: read,
        onSuccess,
        onError,
    })
}