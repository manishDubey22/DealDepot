/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron in development only.
  // Note that you must be using metro's `inlineRequires` for this to work.
  // If you turn it off in metro.config.js, you'll have to manually import it.
  require("./devtools/ReactotronConfig.ts")
}
import "./utils/gestureHandler"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { Linking, StyleSheet, View } from "react-native"
import { useFonts } from "expo-font"
import * as Notifications from "expo-notifications"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"

let KeyboardProviderWrapper: (props: { children: ReactNode }) => ReactNode
try {
  const keyboardController = require("react-native-keyboard-controller")
  KeyboardProviderWrapper =
    keyboardController?.KeyboardProvider ?? (({ children }: { children: ReactNode }) => children)
} catch {
  KeyboardProviderWrapper = ({ children }: { children: ReactNode }) => children
}

import { useInAppUpdates } from "@/hooks/useInAppUpdate"
import { queryClient } from "@/lib/react-query/queryClient"
import { checkForAppUpdate } from "@/services/updateService"

// import { AuthProvider } from "./context/AuthContext" // @demo remove-current-line
import { RetailerAuthProvider } from "./context/RetailerAuthContext"
import { RoleProvider } from "./context/RoleContext"
import { initI18n } from "./i18n"
import { STORAGE_KEY } from "./lib/constants"
import { AppNavigator } from "./navigators/AppNavigator"
import { useNavigationPersistence } from "./navigators/navigationUtilities"
import { store } from "./store"
// import { ThemeProvider } from "./theme/context"
import { customFontsToLoad } from "./theme/typography"
import { loadDateFnsLocale } from "./utils/formatDate"
import * as storage from "./utils/storage"

// Web linking configuration
// const prefix = Linking.createURL("/")
// const config = {
//   screens: {
//     Login: {
//       path: "",
//     },
//     Welcome: "welcome",
//     Demo: {
//       screens: {
//         DemoShowroom: {
//           path: "showroom/:queryIndex?/:itemIndex?",
//         },
//         DemoDebug: "debug",
//         DemoPodcastList: "podcast",
//         DemoCommunity: "community",
//       },
//     },
//   },
// }

/**
 * This is the root component of our app.
 * @param {AppProps} props - The props for the `App` component.
 * @returns {JSX.Element} The rendered `App` component.
 */
export function App() {
  useInAppUpdates()

  useEffect(() => {
    checkForAppUpdate()
  }, [])

  // Show notifications when app is in foreground (e.g. "Download Complete")
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })
  }, [])

  // When user taps "Download Complete" notification, open the PDF
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data as { fileUri?: string }
      if (data?.fileUri) {
        Linking.openURL(data.fileUri)
      }
    })
    return () => sub.remove()
  }, [])

  const {
    // initialNavigationState,
    // onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, STORAGE_KEY.NAVIGATION_STATE)

  const [areFontsLoaded, fontLoadError] = useFonts(customFontsToLoad)
  const [isI18nInitialized, setIsI18nInitialized] = useState(false)

  useEffect(() => {
    initI18n()
      .then(() => setIsI18nInitialized(true))
      .then(() => loadDateFnsLocale())
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!isNavigationStateRestored || !isI18nInitialized || (!areFontsLoaded && !fontLoadError)) {
    return null
  }

  // const linking = {
  //   prefixes: [prefix],
  //   config,
  // }

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureHandlerRoot}>
        <BottomSheetModalProvider>
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <RetailerAuthProvider>
                <NavigationContainer>
                  <RoleProvider>
                    <KeyboardProviderWrapper>
                      {/* <VersionProvider> */}
                      <View style={styles.mainContainer}>
                        <AppNavigator />
                      </View>
                      {/* </VersionProvider> */}
                    </KeyboardProviderWrapper>
                  </RoleProvider>
                </NavigationContainer>
              </RetailerAuthProvider>
            </QueryClientProvider>
          </Provider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  gestureHandlerRoot: {
    flex: 1,
  },
  mainContainer: {
    display: "flex",
    flex: 1,
  },
})
