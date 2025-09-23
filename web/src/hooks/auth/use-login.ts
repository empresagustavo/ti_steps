import { useMutation } from '@tanstack/react-query';
import type { UserAuthModel } from "@/models/user/user-model";
import { login } from '@/services/http/auth.service';




export function useLogin(
    onSuccess?: (data: UserAuthModel) => void,
    onError?: (err: any) => void,
 ) {
  return useMutation<UserAuthModel, Error, { email: string, password: string }>({
    mutationFn: login,
    onSuccess,
    onError,
  });
}

