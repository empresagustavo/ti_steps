import type { UserAuthModel, UserModel } from "@/models/user/user-model";
import type { UserRelNavMainModel } from "@/models/userRelNavMain/userRelNavMain.model";
import { create, createNavMainAccess, findAll, removeNavMainAccess } from "@/services/http/user.service";
import { useMutation } from "@tanstack/react-query";


export function useFindAll(
    onSuccess?: (data: UserModel[]) => void,
    onError?: (err: any) => void,
 ) {
    return useMutation<UserModel[], Error, {}>({
        mutationFn: findAll,
        onSuccess,
        onError,
    });
}

export function useCreate(
    onSuccess?: (data: UserAuthModel) => void,
    onError?: (err: any) => void,
 ) {
    return useMutation<UserAuthModel, Error, { email: string, password: string }>({
        mutationFn: create,
        onSuccess,
        onError,
    });
}

export function useCreateNavAccess(
    onSuccess?: (data: UserRelNavMainModel) => void,
    onError?: (err: any) => void,
 ) {
    return useMutation<UserRelNavMainModel, Error, UserRelNavMainModel>({
        mutationFn: createNavMainAccess,
        onSuccess,
        onError,
    });
}

export function useRemoveNavAccess(
    onSuccess?: (data: boolean) => void,
    onError?: (err: any) => void,
) {
    return useMutation<boolean, Error, UserRelNavMainModel>({
        mutationFn: removeNavMainAccess,
        onSuccess,
        onError,
    })
}