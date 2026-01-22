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

import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { useFonts } from "expo-font"
// import * as Linking from "expo-linking"
// import { KeyboardProvider } from "react-native-keyboard-controller"
// import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClientProvider } from "@tanstack/react-query"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { Provider } from "react-redux"

import { queryClient } from "@/lib/react-query/queryClient"

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
    <GestureHandlerRootView style={styles.gestureHandlerRoot}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RetailerAuthProvider>
            <NavigationContainer>
              <RoleProvider>
                <KeyboardProvider>
                  {/* <VersionProvider> */}
                  <View style={styles.mainContainer}>
                    <AppNavigator />
                  </View>
                  {/* </VersionProvider> */}
                </KeyboardProvider>
              </RoleProvider>
            </NavigationContainer>
          </RetailerAuthProvider>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
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
