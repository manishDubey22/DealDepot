import { loadString } from "@/utils/storage"

const AUTH_TOKEN_KEY = "AuthProvider.authToken"

export async function getToken(): Promise<string | null> {
  return loadString(AUTH_TOKEN_KEY)
}
