export const UI_TEXT = {
  // Field titles
  OWNERS_NAME_TITLE: "Owner's Name",
  STORE_NAME_TITLE: "Store Name",
  EMAIL_TITLE: "Email",
  PASSWORD_TITLE: "Password",
  ADDRESS_TITLE: "Address",
  CITY_TITLE: "City",
  STATE_TITLE: "State",
  ZIP_CODE_TITLE: "Zip Code",
  PHONE_NUMBER_TITLE: "Phone Number",
  PEER_GROUP_TITLE: "Peer group",

  // Placeholders
  OWNERS_NAME_PLACEHOLDER: "Owner's Name",
  STORE_NAME_PLACEHOLDER: "Enter the Store Name",
  EMAIL_PLACEHOLDER: "something@mail.com",
  PASSWORD_PLACEHOLDER: "*************",
  ADDRESS_PLACEHOLDER: "Enter your location",
  CITY_PLACEHOLDER: "Enter your city",
  STATE_PLACEHOLDER: "Enter your state",
  ZIP_CODE_PLACEHOLDER: "Enter your zip code",
  PHONE_NUMBER_PLACEHOLDER: "+1xxxxxxxxxxxx",
  PEER_GROUP_PLACEHOLDER: "Enter the Peer Group",

  // Button text
  CREATE_ACCOUNT_BUTTON: "Create Account Now",

  // Helper text
  ALREADY_HAVE_ACCOUNT: "Already have an account?",
  LOGIN_NOW: "Login Now",

  // Checkbox text
  CHECKBOX_TEXT:
    "I understand that this is a trial version and will receive notifications about account expiration and upgrade options.",

  // Error messages
  AGREE_TO_TERMS_ERROR: "Please agree to the trial terms to continue",
  FILL_ALL_FIELDS: "Please fill in all required fields",
  AGREE_TO_TERMS: "Please agree to the trial terms",
  REGISTRATION_FAILED: "Registration failed",
  CHECK_INFO_AND_TRY_AGAIN: "Please check your information and try again",

  // Success messages
  ACCOUNT_CREATED_SUCCESS: "Account created successfully!",
  REDIRECTING_TO_VERIFICATION: "Redirecting to email verification...",
} as const

export const FORM_FIELDS = {
  NAME: "name",
  STORE_NAME: "storeName",
  EMAIL: "email",
  PASSWORD: "password",
  NUMBER: "number",
  LOCATION: "location",
  CITY: "city",
  STATE: "state",
  ZIP_CODE: "zipCode",
  PEER_GROUP: "peerGroup",
  AGREEMENT: "agreement",
} as const

export const REQUIRED_FIELDS = [
  FORM_FIELDS.NAME,
  FORM_FIELDS.STORE_NAME,
  FORM_FIELDS.EMAIL,
  FORM_FIELDS.PASSWORD,
  FORM_FIELDS.LOCATION,
  FORM_FIELDS.CITY,
  FORM_FIELDS.STATE,
  FORM_FIELDS.ZIP_CODE,
  FORM_FIELDS.NUMBER,
  FORM_FIELDS.PEER_GROUP,
] as const

export const DEFAULT_VALUES = {
  STATE: "California",
} as const

export const ERROR_MESSAGES = {
  REGISTRATION_FAILED: UI_TEXT.REGISTRATION_FAILED,
  CHECK_INFO_AND_TRY_AGAIN: UI_TEXT.CHECK_INFO_AND_TRY_AGAIN,
  AGREE_TO_TERMS_ERROR: UI_TEXT.AGREE_TO_TERMS_ERROR,
  FILL_ALL_FIELDS: UI_TEXT.FILL_ALL_FIELDS,
  AGREE_TO_TERMS: UI_TEXT.AGREE_TO_TERMS,
} as const

export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: UI_TEXT.ACCOUNT_CREATED_SUCCESS,
  REDIRECTING: UI_TEXT.REDIRECTING_TO_VERIFICATION,
} as const

export const CONSOLE_MESSAGES = {
  SELECTED: "selected",
  STATIC_PEERS: "static",
  PAYLOAD: "payload",
  REGISTER_API_RESPONSE: "register api response",
  REGISTRATION_ERROR: "isErrorRegisterPage",
  REGISTRATION_REQUEST_FAILED: "Registration request failed:",
} as const

export const TOAST_CONFIG = {
  SUCCESS_VISIBILITY_TIME: 3000, // 3 seconds
  NAVIGATION_DELAY: 1500, // 1.5 seconds
} as const
