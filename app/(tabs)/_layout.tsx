import { Tabs } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "CircleSlider",
          tabBarIcon: () => (
            <FontAwesome name="circle-thin" size={24} color="purple" />
          ),
        }}
      />
      <Tabs.Screen
        name="lineChart"
        options={{
          title: "LineChart",
          tabBarIcon: () => (
            <FontAwesome name="area-chart" size={24} color="purple" />
          ),
        }}
      />
    </Tabs>
  );
}
