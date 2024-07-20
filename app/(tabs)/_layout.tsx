import { Tabs } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DynamicText, DynamicView } from "@/components";
import Header from "@/components/Ui/Header";

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
      <Tabs.Screen
        name="ui"
        options={{
          title: "LineChart",
          tabBarIcon: () => (
            <FontAwesome name="mobile-phone" size={24} color="purple" />
          ),
        }}
      />
    </Tabs>
  );
}
