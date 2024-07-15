import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DatabaseScreen from "../screens/DatabaseScreen";
import RecipeScreen from "../screens/recipeScreen";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 18,
          left: 20,
          right: 20,
          borderRadius: 20,
          padding: 10,
          height: 90,
          backgroundColor: "#A3E4D7",
        },
      }}
    >
      <Tab.Screen
        name="RecipeScreen"
        component={RecipeScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={"cutlery"}
              size={30}
              color={focused ? "#5DADE2" : "#979A9A"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DataBaseScreen"
        component={DatabaseScreen}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome
              name={"heart"}
              size={30}
              color={focused ? "#5DADE2" : "#979A9A"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
