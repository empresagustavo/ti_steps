import type { NavMainModel } from "@/models/user/nav-main-model";
import { getAllNavs } from "@/services/http/nav.service";
import { useMutation } from "@tanstack/react-query";



export function useFindAllNavs(
    onSuccess?: (data: NavMainModel[]) => void,
    onError?: (err: any) => void,
) {
    return useMutation<NavMainModel[], Error, {}>({
        mutationFn: getAllNavs,
        onSuccess,
        onError,
    })
}