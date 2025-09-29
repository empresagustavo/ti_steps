import type { SnackModel, SnackStats } from "@/models/snack/snack.model";
import { createSnack, getAllSnacks, getAllSnacksStats, updateSnack } from "@/services/http/snack.service";
import { useMutation } from "@tanstack/react-query";


export function useFindAllSnacks(onSuccess: (data: SnackModel[]) => void, onError: (err: any) => void) {
    return useMutation<SnackModel[], Error, {startDate: Date, endDate: Date}>({
        mutationFn: getAllSnacks,
        onSuccess,
        onError,
    })
}

export function useFindAllSnacksStats(onSuccess: (data: SnackStats) => void, onError: (err: any) => void) {
    return useMutation<SnackStats, Error, {startDate: Date, endDate: Date}>({
        mutationFn: getAllSnacksStats,
        onSuccess,
        onError,
    })
}

export function useCreateSnack(onSuccess: (data: SnackModel) => void, onError: (err: any) => void) {
    return useMutation<SnackModel, Error, SnackModel>({
        mutationFn: createSnack,
        onSuccess,
        onError,
    })
}

export function useUpdateSnack(onSuccess: (data: SnackModel) => void, onError: (err: any) => void) {
    return useMutation<SnackModel, Error, SnackModel>({
        mutationFn: updateSnack,
        onSuccess,
        onError,
    })
}