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
import { financialData } from "../data";

const FONT_ASSET = "YourCustomFont-Bold";

const PLOT_AREA_HEIGHT = 60;
const HORIZONTAL_MARGIN = 12;
const MONTHS_PER_VIEW = 6;
const MIN_COLUMN_WIDTH = 64;

const MAX_DATA_VALUE = Math.max(...financialData.map((d) => d.revenu));

const FINANCIAL_ITEMS = [
  { key: "revenu", color: "#6500A8" },
  { key: "epargne", color: "#848400" },
  { key: "depense", color: "#A10078" },
  { key: "investissement", color: "#0F50A6" },
];

export default function CustomBarChart() {
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  const currentMonthIndex = Math.min(
    new Date().getMonth(),
    financialData.length - 1
  );

  const [activeIndex, setActiveIndex] = useState(currentMonthIndex);

  // 🎬 animation apparition
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    [FONT_ASSET]: require("../assets/Font/SF-Pro-Display-Semibold.otf"),
  });

  const chartWidth = width - HORIZONTAL_MARGIN * 2;
  const columnWidth = Math.max(chartWidth / MONTHS_PER_VIEW, MIN_COLUMN_WIDTH);

  const contentWidth = columnWidth * financialData.length;

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
          {financialData.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <View
                key={item.month}
                style={[styles.barItem, { width: columnWidth }]}
              >
                <Pressable
                  onPress={() => handlePress(index)}
                  style={styles.clickableZone}
                >
                  {/* BAR */}
                  <View
                    style={[styles.stackedBar, isActive && styles.activeBar]}
                  >
                    {FINANCIAL_ITEMS.map((type) => {
                      const height =
                        (item[type.key] / MAX_DATA_VALUE) * PLOT_AREA_HEIGHT;

                      return (
                        <View
                          key={type.key}
                          style={{
                            height,
                            backgroundColor: type.color,
                          }}
                        />
                      );
                    })}
                  </View>

                  {/* MOIS */}
                  <Text
                    style={[styles.monthLabel, isActive && styles.activeMonth]}
                  >
                    {item.month}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* 📊 CadeStatistique animé */}
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
            marginHorizontal: 70,
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
    borderWidth: 2,
    borderColor: "#363741",
    paddingVertical: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  barsWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 180,
  },

  barItem: {
    alignItems: "center",
  },

  clickableZone: {
    alignItems: "center",
  },

  stackedBar: {
    width: "60%",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "flex-end",
    opacity: 0.6,
  },

  activeBar: {
    opacity: 1,
    transform: [{ scaleY: 1.05 }],
  },

  monthLabel: {
    color: "#AAA",
    fontSize: 12,
    marginTop: 6,
  },

  activeMonth: {
    color: "#FFF",
    fontWeight: "700",
  },
});
