export const UI_TEXT = {
  FAVOURITES: "Favourites",
  CURRENT_PEER_GROUP: "Current Peer Group",
  NO_FAVOURITES: "No favourite products found.",
  SELECT_PEER_GROUP_HINT: "Please select Peer group to see current prices",
  SUBSCRIBE_CTA: "Please Subscribe to access Prices of all peer Groups",
  FAILED_TO_LOAD: "Failed to load favorites",
  SOME_FEATURES_UNAVAILABLE: "Some features may not be available",
  CATEGORY_PREFIX: "Category : ",
} as const

export const STORAGE_KEYS = {
  PEER_GROUP: "peergroup",
  /** Typo preserved for compatibility with existing storage */
  PREMIUM_USER: "premuimUser",
} as const
