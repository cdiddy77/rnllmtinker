import * as React from "react";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "./screens/Home/HomeScreen";
import { SettingsScreen } from "./screens/Settings/SettingsScreen";
import { RootParamList } from "./shared/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OcrScreen } from "./screens/Ocr/OcrScreen";
import { View } from "react-native";
import { ModelsScreen } from "./screens/Models/ModelsScreen";
// import { SafeAreaView } from "react-native";

const Tab = createBottomTabNavigator<RootParamList>();

export default function App() {
  const navigationRef = useNavigationContainerRef<RootParamList>();
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer ref={navigationRef}>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Ocr"
              component={OcrScreen}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Models"
              component={ModelsScreen}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
