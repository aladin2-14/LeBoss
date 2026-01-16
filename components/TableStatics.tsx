import { useFonts } from "expo-font";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import CadeStatistique from "@/components/CadeStatistique";
import Mettre from "@/components/Mettre";
import Sortir from "@/components/Sortir";
import { getUserFinancialData } from "../data";

const FONT_ASSET = "YourCustomFont-Bold";

const HORIZONTAL_MARGIN = 12;
const MONTHS_PER_VIEW = 6;
const MIN_COLUMN_WIDTH = 64;

export default function CustomBarChart() {
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  // 🔥 Données utilisateur
  const userData = getUserFinancialData();

  const currentMonthIndex = Math.min(
    new Date().getMonth(),
    userData.length - 1
  );

  const [activeIndex, setActiveIndex] = useState(currentMonthIndex);

  // 🎬 Animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    [FONT_ASSET]: require("../assets/Font/SF-Pro-Display-Semibold.otf"),
  });

  const chartWidth = width - HORIZONTAL_MARGIN * 2;
  const columnWidth = Math.max(chartWidth / MONTHS_PER_VIEW, MIN_COLUMN_WIDTH);
  const contentWidth = columnWidth * userData.length;

  const animateCade = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.95);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePress = (index: number) => {
    setActiveIndex(index);
    animateCade();
  };

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: columnWidth * Math.max(activeIndex - 2, 0),
      animated: true,
    });
  }, [activeIndex, columnWidth]);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.chartContainer,
        { width: chartWidth, marginHorizontal: HORIZONTAL_MARGIN },
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: contentWidth }}
      >
        <View style={styles.barsWrapper}>
          {userData.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <View
                key={`${item.month}-${index}`}
                style={[styles.barItem, { width: columnWidth }]}
              >
                <Pressable
                  onPress={() => handlePress(index)}
                  style={styles.clickableZone}
                >
                  {/* 🔘 POINT */}
                  <View
                    style={[
                      styles.monthDot,
                      isActive && styles.activeDot,
                    ]}
                  />

                  {/* 🗓️ MOIS */}
                  <Text
                    style={[
                      styles.monthLabel,
                      isActive && styles.activeMonth,
                    ]}
                  >
                    {item.month}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 📊 Stats */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <CadeStatistique monthIndex={activeIndex} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 30,
            marginTop: 14,
          }}
        >
          <Sortir monthIndex={activeIndex} />
          <Mettre monthIndex={activeIndex} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    borderRadius: 20,
    borderWidth: 1.6,
    borderColor: "#363741",
    paddingVertical: 14,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  barsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
  },

  barItem: {
    alignItems: "center",
  },

  clickableZone: {
    alignItems: "center",
  },

  monthDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#555",
    marginBottom: 8,
  },

  activeDot: {
    backgroundColor: "#FFD700",
    transform: [{ scale: 1.6 }],
  },

  monthLabel: {
    color: "#AAA",
    fontSize: 12,
  },

  activeMonth: {
    color: "#FFD700",
    fontWeight: "700",
  },
});
