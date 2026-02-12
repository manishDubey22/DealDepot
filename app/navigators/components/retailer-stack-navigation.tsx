import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { HeaderComponent } from "@/components/common-components"
import { OptionScreen } from "@/screens/common-screens/option-screen"
import {
  CreateNewAccount,
  EditProfile,
  EmailVerification,
  Favourites,
  HomeOptionList,
  Login,
  Order,
  PreviewPDF,
  ProductDescription,
  Profile,
  SaveOrder,
  SalesGraph,
  Scanner,
  Search,
} from "@/screens/retailer"
import { colors } from "@/theme/colors"
import { CommonStyles } from "@/theme/common-styles"
import { commonStyles } from "@/theme/styles"

import { Icon } from "../../../assets/icons/wholeSeller"
import { RetailerRoutes } from "../retailer/routes"

// ----------Components-----------------

// import Home from '../../screens/retailer/Home';
// import CreateNewAccount from '../../screens/retailer/CreateNewAccount';
// import EmailVerification from '../../screens/retailer/EmailVerification';
// import ResetPassword from '../../screens/retailer/ResetPassword';
// import Profile from '../../screens/retailer/Profile';
// import Order from '../../screens/retailer/Order';
// import SaveOrder from '../../screens/retailer/SaveOrder';
// import ProductDescription from '../../screens/retailer/ProductDescription';
// import SalesGraph from '../../screens/retailer/SalesGraph';
// import UploadFile from '../../screens/retailer/Upload Files';
// import EditProfile from '../../screens/retailer/EditProfile';

// import {WithoutImageHeader, HeaderComponent} from '../../components/CommonComponents/header';

// import Scanner from '../../screens/retailer/Scanner';
// import CustomPDF from '../../screens/retailer/SaveOrder/component/customPDF';
// import RenderPDF from '../../screens/retailer/SaveOrder/component/renderPDF';
// import {useCustomBackHandler} from './useCustomBackHandler';
// import FailureScreen from '../../components/PaymentScreens/FailureScreen';
// import SuccessScreen from '../../components/PaymentScreens/SuccessScreen';
// import LoadingScreen from '../../components/PaymentScreens/LoadingScreen';
// import SubscriptionPlans from '../../components/PaymentScreens/SubscriptionPlans';
// import Options from '../../screens/retailer/optionList/Options';
// import Favourites from '../../screens/retailer/favouriteItems';
// import PriceHistory from '../../screens/retailer/PriceHistory';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabBarIcon = ({ icon, focused }: { icon: ImageSourcePropType; focused: boolean }) => {
  return (
    <Image
      source={icon}
      style={[
        styles.tabBarIcon,
        { tintColor: focused ? colors.customColors.GREEN : colors.palette.grey500 },
      ]}
    />
  )
}

const BottomTabNavigator = () => {
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.customColors.GREEN,
      }}
    >
      <Tab.Screen
        name={RetailerRoutes.OPTIONS}
        component={HomeOptionList}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none",
          },
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.HOME} focused={focused} />,

          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Home" />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.SEARCH}
        component={Search}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none" as any,
          },
          headerStyle: {
            backgroundColor: colors.palette.neutral100,
            borderBottomColor: colors.palette.neutral300,
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Search" />,
          tabBarButton: () => null, // This hides the tab bar button completely
        }}
      />

      <Tab.Screen
        name={RetailerRoutes.CART}
        component={Order}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none" as any,
          },
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.SHOPINGCART} focused={focused} />,
          headerStyle: {
            backgroundColor: colors.palette.neutral100,
            borderBottomColor: colors.palette.neutral300,
            borderBottomWidth: StyleSheet.hairlineWidth,
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="My Cart" />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.SCAN}
        component={Scanner}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none" as any,
          },
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.SCAN} focused={focused} />,
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Scanner" />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.SAVE_ORDER}
        component={SaveOrder}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: "none" as any,
          },
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.ORDER} focused={focused} />,
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="SaveOrder" />,
        }}
      />
      <Tab.Screen
        name={RetailerRoutes.PROFILE}
        component={Profile}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.palette.neutral100,
            height: 100,
          },
          headerTitleStyle: {
            color: colors.palette.charcoal500,
            fontFamily: CommonStyles.fontFamily.fontFamily,
            fontSize: 20,
          },
          headerRightContainerStyle: {
            paddingRight: 10,
          },
          headerTitleAlign: "center",
          // -----------Need to be navigate ---- navigation.navigate(Constant.ScreenName.EDIT_PROFILE)
          headerRight: () => (
            <TouchableOpacity
              onPress={() => (navigation as any).navigate(RetailerRoutes.EDIT_PROFILE)}
            >
              <TabBarIcon icon={Icon.EDIT} focused={false} />
            </TouchableOpacity>
          ),
          headerTintColor: "#FFF",
          tabBarIcon: ({ focused }) => <TabBarIcon icon={Icon.PROFILE} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  )
}
export const RetailerStackNavigation = ({
  role,
  authToken,
}: {
  role: string | unknown | undefined
  authToken: string | unknown | undefined
}) => {
  const initialRouteName = role && authToken ? RetailerRoutes.TAB_CONTAINER : RetailerRoutes.LOGIN

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {/* <Stack.Navigator initialRouteName={RetailerRoutes.CART}> */}
      <Stack.Screen
        name={RetailerRoutes.OPTION}
        component={OptionScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.LOGIN}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.CREATE_NEW_ACCOUNT}
        component={CreateNewAccount}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            backgroundColor: commonStyles.colors.secondaryColor,
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Create Account" />,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.EMAIL_VERIFICATION}
        component={EmailVerification}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.customColors.WHITE,
            // height: 100,
          },
          headerTitleStyle: {
            color: colors.palette.charcoal500,
            fontFamily: CommonStyles.fontFamily.fontFamily,
            fontSize: 20,
          },
          headerTitle: "Verify",
          headerTitleAlign: "center",
          headerTintColor: colors.palette.neutral100,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.TAB_CONTAINER}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name={RetailerRoutes.RESET_PASSWORD}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.customColors.WHITE,
            height: 100,
          },
          headerTitleStyle: {
            color: colors.palette.charcoal500,
            fontFamily: CommonStyles.fontFamily.fontFamily,
            fontSize: 20,
          },
          headerTitle: 'Reset Password',
          headerTitleAlign: 'center',
          headerTintColor: colors.palette.neutral100,
        }}>
        {() => <ResetPassword role={role} />}
      </Stack.Screen> */}
      <Stack.Screen
        name={RetailerRoutes.SAVE_ORDER}
        component={SaveOrder}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Saved Order" />,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.PRODUCT_DESCRIPTION}
        component={ProductDescription}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Product Description" />,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.SALES_GRAPH}
        component={SalesGraph}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Sales Graph" />,
        }}
      />
      {/* <Stack.Screen
        name={RetailerRoutes.UPLOAD_FILE}
        component={UploadFile}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: 'none',
          },
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
          header: () => <HeaderComponent value="Upload Files" />,
        }}
      /> */}
      <Stack.Screen
        name={RetailerRoutes.EDIT_PROFILE}
        component={EditProfile}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Edit Profile" />,
        }}
      />
      <Stack.Screen
        name={RetailerRoutes.PREVIEW_PDF}
        component={PreviewPDF}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: "rgba(0, 0, 0, 0.25)",
          },
          header: () => <HeaderComponent value="Preview PDF" />,
        }}
      />
      {/* <Stack.Screen
        name={RetailerRoutes.RENDER_PDF}
        component={RenderPDF}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: 'none',
          },
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
          header: () => <HeaderComponent value="Render PDF" />,
        }}
      /> */}
      {/* <Stack.Screen
        name={RetailerRoutes.FAILURE}
        component={FailureScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name={RetailerRoutes.SUCCESS}
        component={SuccessScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name={RetailerRoutes.LOADING}
        component={LoadingScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name={RetailerRoutes.SUBSCRIPTIONPLAN}
        component={SubscriptionPlans}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: 'none',
          },
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
          header: () => WithoutImageHeader('Subscriptions Plans'),
        }}
      /> */}
      <Stack.Screen
        name={RetailerRoutes.FAVOURITES}
        component={Favourites}
        options={{
          headerShown: true,
          headerTitleStyle: {
            // @ts-expect-error - display property not in type but works at runtime
            display: "none",
          },
          headerStyle: {
            // @ts-expect-error - height property not in type but works at runtime
            height: 80,
            elevation: 5,
            shadowColor: colors.palette.grey400,
          },
          header: () => <HeaderComponent value="Favourites" />,
        }}
      />
      {/* <Stack.Screen
        name={RetailerRoutes.PRICEHISTORY}
        component={PriceHistory}
        options={{
          headerShown: true,
          headerTitleStyle: {
            display: 'none',
          },
          headerStyle: {
            height: 80,
            elevation: 5,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
          },
          header: () => <HeaderComponent value="Price History" />,
        }}
      /> */}
    </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  // gradient: {
  //   alignItems: "center",
  //   flex: 1,
  //   height: "100%",
  //   justifyContent: "center",
  //   width: "100%",
  // },
  tabBarIcon: { height: 25, margin: 20, padding: 10, width: 25 },
})
