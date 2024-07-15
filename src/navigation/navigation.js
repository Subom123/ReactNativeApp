import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcomeScreen.js";
import RecipeScreen from "../screens/recipeScreen.js";
import RecipeDetails from "../screens/recipeDetails";
import DatabaseScreen from "../screens/DatabaseScreen.js";
import SignInScreen from "../screens/SIgnInScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import MainTabNavigator from "./tabNavigation.js";
import Toast from "react-native-toast-message";

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Create AppNavigator component
const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          {/* Use TabNavigation as a nested navigator */}
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
          {/* <Stack.Screen name="DatabaseScreen" component={DatabaseScreen} /> */}
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default AppNavigator;
