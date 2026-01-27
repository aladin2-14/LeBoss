import { Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { CircleUser, House, Target } from "lucide-react-native";

import { toastConfig } from "@/components/toastUi/toastConfig";
import Toast from "react-native-toast-message";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const TAB_HEIGHT = Platform.OS === "ios" ? 90 : 64;

// 📐 Dimensions responsives
const ICON_WIDTH = SCREEN_WIDTH * 0.26; // ~26% écran
const ICON_HEIGHT = 44; // hauteur idéale (UX fintech)

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // 🔹 Animation scale
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animateFocus = (focused: boolean) => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.08 : 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  const renderIcon = (Icon: any, focused: boolean) => {
    useEffect(() => {
      animateFocus(focused);
    }, [focused]);

    return (
      <Animated.View
        style={[
          styles.iconWrapper,
          focused && styles.iconWrapperActive,
          {
            width: ICON_WIDTH,
            height: ICON_HEIGHT,
            transform: [{ scale: focused ? scaleAnim : 1 }],
          },
        ]}
      >
        <Icon
          size={22}
          color={focused ? "#111827" : "#FFFFFF"}
          strokeWidth={focused ? 2.6 : 2}
        />

        {focused && <View style={styles.activeDot} />}
      </Animated.View>
    );
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarShowLabel: false,
          tabBarStyle: [
            styles.tabBar,
            {
              height: TAB_HEIGHT + insets.bottom,
              paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            },
          ],
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => renderIcon(House, focused),
          }}
        />

        <Tabs.Screen
          name="objectif"
          options={{
            tabBarIcon: ({ focused }) => renderIcon(Target, focused),
          }}
        />

        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ focused }) => renderIcon(CircleUser, focused),
          }}
        />
      </Tabs>

      <Toast config={toastConfig} />
    </>
  );
}

// =====================
// 🎨 STYLES FINTECH
// =====================
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0C0C1D",
    borderTopWidth: 0,
    elevation: 0,
  },

  iconWrapper: {
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#363741",
    backgroundColor: "#0C0C1D",
    justifyContent: "center",
    alignItems: "center",
  },

  iconWrapperActive: {
    backgroundColor: "#FFD700",
    borderWidth: 0,
  },

  activeDot: {
    position: "absolute",
    bottom: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#111827",
  },
});
