import { BASE_URL } from "./config.base"

export default {
  API_URL: BASE_URL.BASE,
  POSTHOG_API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY || "",
  POSTHOG_HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
  POSTHOG_ENABLED: process.env.EXPO_PUBLIC_POSTHOG_ENABLED === "true",
}
