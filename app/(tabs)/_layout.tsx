import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ChartSpline, CircleUser, House, Target } from "lucide-react-native";

import Toast from "react-native-toast-message"; // <-- import du toast

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarActiveTintColor: themeColors.tint,
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#0C0C1D",
            borderTopWidth: 0,
            height: Platform.OS === "ios" ? 90 : 60,
            paddingBottom: Platform.OS === "ios" ? 20 : 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <House size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="statics"
          options={{
            title: "Statics",
            tabBarIcon: ({ color }) => <ChartSpline size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="objectif"
          options={{
            title: "objectif",
            tabBarIcon: ({ color }) => <Target size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color }) => <CircleUser size={20} color={color} />,
          }}
        />
      </Tabs>

      {/* Toast global */}
      <Toast />
    </>
  );
}
