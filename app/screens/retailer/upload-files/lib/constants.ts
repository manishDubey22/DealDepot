export const MADRFILEURL = "https://wicvendor.wic.ca.gov"

export const UI_TEXT = {
  STEP_DOWNLOAD: "Download up to date MADR file",
  STEP_SELECT_PEER: "Select peer group",
  PEER_GROUP_PLACEHOLDER: "Peer Group",
  SELECT_MADR_FILE: "Select MADR File",
  UPLOAD: "Upload",
  UPLOADING: "Uploading...",
  SELECT_PEER_TOAST: "Please Select Peer group before uploading file",
  INVALID_URL_TOAST: (url: string) => `Invalid URL: ${url}`,
  SUCCESS_SUFFIX: "!!!!!",
} as const
