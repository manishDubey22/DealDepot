import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import { postLoginData, postRegisterData } from "./api"
import type {
  LoginApiResponse,
  LoginErrorResponse,
  LoginRequest,
  RegisterErrorResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types"

export function useLoginMutation(
  options?: UseMutationOptions<{ data: LoginApiResponse }, LoginErrorResponse, LoginRequest>,
) {
  const mutation = useMutation<{ data: LoginApiResponse }, LoginErrorResponse, LoginRequest>({
    mutationFn: async (request: LoginRequest) => {
      const response = await postLoginData(request)
      return { data: response.data }
    },
    ...options,
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}

export function useRegisterMutation(
  options?: UseMutationOptions<RegisterResponse, RegisterErrorResponse, RegisterRequest>,
) {
  const mutation = useMutation<RegisterResponse, RegisterErrorResponse, RegisterRequest>({
    mutationFn: async (request: RegisterRequest) => {
      const response = await postRegisterData(request)
      return response.data
    },
    ...options,
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
