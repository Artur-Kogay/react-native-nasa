import {
  StackHeaderProps,
  createStackNavigator,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SelectionScreen from "../screens/SelectionScreen";
import CameraRollScreen from "../screens/CameraRollScreen";
import ImageScreen from "../screens/ImageScreen";
import CustomHeader from "../components/CustomHeader/CustomHeader";
import { NavigationParamList } from "../types/NavigationTypes";

const Stack = createStackNavigator<NavigationParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Selection"
            component={SelectionScreen}
            options={{
              headerTitle: "Select camera and Date",
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "rgba(220, 206, 190, 1)" },
              headerTitleStyle: {
                fontFamily: 'dosis-bold'
              }
            }}
          />
          <Stack.Screen
            name="CameraRoll"
            component={CameraRollScreen}
            options={{
              header: ({ navigation }) => (
                <CustomHeader navigation={navigation} />
              ),
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "rgba(220, 206, 190, 1)" },
            }}
          />
          <Stack.Screen
            name="Image"
            component={ImageScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
