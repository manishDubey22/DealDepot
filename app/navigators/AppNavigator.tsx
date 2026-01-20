/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
// import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { MenuProvider } from "react-native-popup-menu"
import { responsiveHeight } from "react-native-responsive-dimensions"
// import SplashScreen from "react-native-splash-screen"
import Toast from "react-native-toast-message"

import { Text } from "@/components/Text"
import { UpgradeModal } from "@/components/upgradeVersion"
import { OptionScreen } from "@/screens/option-screen"
import { useAppSelector } from "@/store"
import { ThemeProvider } from "@/theme/context"
import { role } from "@/utils/role"
import { useVersionCheck } from "@/utils/VersionContext"

// Documentation: https://reactnavigation.org/docs/stack-navigator/
// const Stack = createNativeStackNavigator<AppStackParamList>()

// const AppStack = () => {
//   const userRole = useAppSelector((state) => state.rootReducer.auth.userRole.data)
//   const {
//     theme: { colors },
//   } = useAppTheme()

//   // Determine initial route based on role selection and auth state
//   const getInitialRoute = () => {
//     if (!userRole) return "Option"
//   }

//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         navigationBarColor: colors.background,
//         contentStyle: {
//           backgroundColor: colors.background,
//         },
//       }}
//       initialRouteName={getInitialRoute()}
//     >
//       <Stack.Screen name="Option" component={OptionScreen} />
//     </Stack.Navigator>
//   )
// }

const MainStack = () => {
  // const userDetails = useAppSelector(state => state?.rootReducer?.auth?.userVerification.data);
  const selectedRole = useAppSelector((state: any) => state?.rootReducer?.auth?.userRole?.data)
  // const dispatch = useAppDispatch();
  const [loading] = useState(false)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const userInfo = await AsyncStorage.getItem('userInfo');
  //       if (userInfo !== null) {
  //         const jsonUserInfo = JSON.parse(userInfo);
  //         dispatch(updateUserRoleAction(jsonUserInfo?.role));
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);
  let componentToRender
  switch (true) {
    case loading:
      componentToRender = (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
      break
    case selectedRole === role.WHOLE_SELLER:
      componentToRender = (
        // <WholeSellerStackNavigation role={selectedRole} authToken={userDetails?.accessToken} />
        <View>
          <Text>Whole Seller</Text>
        </View>
      )
      break
    case selectedRole === role.RETAILER:
      componentToRender = (
        // <RetailerStackNavigation role={selectedRole} authToken={userDetails?.accessToken} />
        <View>
          <Text>Retailer</Text>
        </View>
      )
      break
    default:
      componentToRender = <OptionScreen />
  }
  return componentToRender
}

export const AppNavigator = () => {
  // const { navigationTheme } = useAppTheme()

  const { needsUpdate, details, forceUpdate, setNeedsUpdate } = useVersionCheck()

  if (needsUpdate) {
    return (
      <UpgradeModal
        isVisible={needsUpdate}
        details={details}
        forceUpdate={forceUpdate}
        setNeedsUpdate={setNeedsUpdate}
      />
    )
  }

  // useEffect(() => {
  //   SplashScreen.hide()
  // }, [])

  return (
    <ThemeProvider>
      <MenuProvider>
        <MainStack />
        <Toast />
        {/* <NoInternetConnection /> */}
      </MenuProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  // tabBarIcon: { height: 25, width: 25 },
  // gradient: {
  //   flex: 1,
  //   width: "100%",
  //   height: "100%",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // headerTitle: {
  //   color: "#343434",
  //   fontFamily: "Arial-Rounded-Bold",
  //   fontSize: 20,
  // },
  loaderContainer: {
    alignSelf: "center",
    paddingTop: responsiveHeight(30),
  },
})
