import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Toast } from "react-native-toast-message/lib/src/Toast"

import { authMutationOptions } from "@/api/retailer/auth"
import { productQueryOptions } from "@/api/retailer/product"
import ButtonField from "@/components/common-components/button/button"
import { InputFieldContianer } from "@/components/common-components/input-field-contianer/input-field-contianer"
import { WholeSellerRoutes } from "@/navigators/wholeSeller/routes"
import { retailerSignupSchema } from "@/utils/schema"

import { styles } from "./lib/styles"

interface IFormInput {
  name: string
  storeName: string
  email: string
  password: string
  number: string
  location: string
  city: string
  state: string
  zipCode: string
  peerGroup: string
  agreement: boolean
}
export default function CreateNewAccount({ navigation }: any) {
  const [selected, setSelectedValue] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [checkboxError, setCheckboxError] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const { mutateAsync: handleRegisterPress, isPending: isLoading } =
    authMutationOptions.useRegisterMutation()
  const {
    data: peersData,
    error: peersError,
    status: peersStatus,
    isLoading: _isLoadingPeers,
  } = productQueryOptions.useStaticPeersQuery()
  const staticPeers = (peersData as { data?: string[] })?.data || []

  console.log("selected", selected)
  console.log(peersStatus, "static", peersData, "nmsnfda", peersError)
  const {
    // register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<IFormInput>({
    resolver: yupResolver(retailerSignupSchema),
    defaultValues: {
      state: "California", // Set default value for state
    },
  })

  // Watch all form fields to validate form completion
  const watchedFields = watch()

  // Validate form fields completion
  useEffect(() => {
    const requiredFields = [
      "name",
      "storeName",
      "email",
      "password",
      "location",
      "city",
      "state",
      "zipCode",
      "number",
      "peerGroup",
    ]

    const isAllFieldsFilled = requiredFields.every((field) => {
      const value = watchedFields[field as keyof IFormInput]
      return value && value.toString().trim() !== ""
    })

    setIsFormValid(isAllFieldsFilled)
  }, [watchedFields])

  // Removed disclosure terms logging
  const onSubmit = async (payloadData: IFormInput) => {
    // Validate checkbox first
    if (!agreeToTerms) {
      setCheckboxError("Please agree to the trial terms to continue")
      return
    }

    // Clear any previous checkbox error
    setCheckboxError("")

    const email = payloadData?.email
    const payload = {
      ...payloadData,
      agreement: true, // Always set to true since we removed the disclosure requirement
    }
    try {
      console.log("payload", payload)
      const response = await handleRegisterPress(payload)

      if (response?.status) {
        console.log("register api response", response)

        // Show success toast with 3-second timer
        Toast.show({
          type: "success",
          text1: "Account created successfully!",
          text2: "Redirecting to email verification...",
          visibilityTime: 3000, // 3 seconds
        })

        // Navigate after a short delay to show the toast
        setTimeout(() => {
          navigation.navigate(WholeSellerRoutes.EMAIL_VERIFICATION, { email })
          reset()
        }, 1500) // 1.5 second delay to show the toast
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error: any) {
      console.log("isErrorRegisterPage", error)

      // Extract error message from response
      let errorMessage = "Registration failed"
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message
      } else if (error?.message) {
        errorMessage = error.message
      } else if (error?.error?.data?.message) {
        errorMessage = error.error.data.message
      }

      Toast.show({
        type: "error",
        text1: errorMessage,
        text2: "Please check your information and try again",
      })
      console.error("Registration request failed:", error)
    }
  }

  // Removed disclosure terms handler
  interface KeyValueObject {
    key: string
    value: string
  }

  const arrayValues: string[] = staticPeers
  const dropdownArray: KeyValueObject[] = []

  arrayValues?.forEach((value, index) => {
    const keyValueObject: KeyValueObject = {
      key: String(index + 1),
      value: value,
    }
    dropdownArray.push(keyValueObject)
  })

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.textInputContainer}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="Owner's Name"
                  placeholder="Owner's Name"
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="name"
            />
            {errors.name?.message && (
              <Text style={styles.validationError}>{errors.name?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="Store Name"
                  placeholder="Enter the Store Name"
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="storeName"
            />
            {errors.storeName?.message && (
              <Text style={styles.validationError}>{errors.storeName?.message}</Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="Email"
                  placeholder="something@mail.com"
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="email"
            />
            {errors.email?.message && (
              <Text style={styles.validationError}>{errors.email?.message}</Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="Password"
                  placeholder="*************"
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                  secureTextEntry={true}
                />
              )}
              name="password"
            />
            {errors.password?.message && (
              <Text style={styles.validationError}>{errors.password?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="Address"
                  placeholder="Enter your location"
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="location"
            />
            {errors.location?.message && (
              <Text style={styles.validationError}>{errors.location?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputFieldContianer
                  title="City"
                  placeholder="Enter your city"
                  textContainerStyle={styles.textInputMargin}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
              name="city"
            />
            {errors.city && <Text style={styles.validationError}>{errors.city.message}</Text>}

            {/* New State Input Field */}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="State"
                  placeholder="Enter your state"
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="state"
            />
            {errors.state?.message && (
              <Text style={styles.validationError}>{errors.state?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputFieldContianer
                  title="Zip Code"
                  textContainerStyle={styles.textInputMargin}
                  placeholder="Enter your zip code"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text)}
                  value={value}
                />
              )}
              name="zipCode"
            />
            {errors.zipCode && <Text style={styles.validationError}>{errors.zipCode.message}</Text>}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="Phone Number"
                  placeholder="+1xxxxxxxxxxxx"
                  textContainerStyle={styles.textInputMargin}
                  value={value}
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                />
              )}
              name="number"
            />
            {errors.number?.message && (
              <Text style={styles.validationError}>{errors.number?.message}</Text>
            )}

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFieldContianer
                  title="Peer group"
                  placeholder="Enter the Peer Group"
                  onChangeText={(text) => {
                    onChange(text)
                  }}
                  dropdownData={dropdownArray}
                  setSelectedValue={setSelectedValue}
                  value={value}
                  textContainerStyle={styles.peerGroupTextContainer}
                />
              )}
              name="peerGroup"
            />
            {errors.peerGroup?.message && (
              <Text style={styles.validationError}>{errors.peerGroup?.message}</Text>
            )}
          </View>

          <View>
            {/* Removed disclosure terms UI */}
            {/* Trial Terms Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setAgreeToTerms(!agreeToTerms)
                // Clear error when user interacts with checkbox
                if (checkboxError) {
                  setCheckboxError("")
                }
              }}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.checkbox,
                  agreeToTerms && styles.checkboxChecked,
                  checkboxError && styles.checkboxError,
                ]}
              >
                {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>
                I understand that this is a trial version and will receive notifications about
                account expiration and upgrade options.
              </Text>
            </TouchableOpacity>
            {checkboxError ? (
              <Text style={styles.checkboxErrorMessage}>{checkboxError}</Text>
            ) : null}

            <ButtonField
              value="Create Account Now"
              isDisabled={isLoading || !agreeToTerms || !isFormValid}
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
            />

            {/* Show helpful message when button is disabled */}
            {!isLoading && (!isFormValid || !agreeToTerms) && (
              <Text style={styles.helperMessage}>
                {!isFormValid
                  ? "Please fill in all required fields"
                  : "Please agree to the trial terms"}
              </Text>
            )}
            <View style={styles.helperTextContainer}>
              <Text style={styles.helpertext1}>Already have an account?</Text>
              <TouchableOpacity
                style={styles.loginButtonContainer}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.helperText2}>Login Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      {/* Removed disclosure terms popup modal */}
    </View>
  )
}
