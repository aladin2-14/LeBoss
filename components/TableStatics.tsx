import { useFonts } from "expo-font";
import React, { useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { financialData } from "../data"; // ✅ IMPORTATION DU DATA.TS

import CadeStatic from "@/components/CadeStatistique";


const FONT_ASSET = "YourCustomFont-Bold";

const MAX_DATA_VALUE = Math.max(...financialData.map((money) => money.revenu));
console.log("bonjour", MAX_DATA_VALUE)
const PLOT_AREA_HEIGHT = 60;
const HORIZONTAL_MARGIN = 12;
const MONTHS_PER_VIEW = 6;
const MIN_COLUMN_WIDTH = 64;

// Définition des segments empilés avec couleur
const FINANCIAL_ITEMS = [
  { key: "revenu", color: "#6500A8" },
  { key: "epargne", color: "#848400" },
  { key: "depense", color: "#A10078" },
  { key: "investissement", color: "#0F50A6" },
];

const CustomBarChart = () => {
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  const [fontsLoaded] = useFonts({
    [FONT_ASSET]: require("../assets/Font/SF-Pro-Display-Semibold.otf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const chartWidth = width - HORIZONTAL_MARGIN * 2;
  const computedColumnWidth = Math.max(
    chartWidth / MONTHS_PER_VIEW,
    MIN_COLUMN_WIDTH
  );
  const contentWidth = computedColumnWidth * financialData.length;
  const initialScrollOffset = computedColumnWidth * MONTHS_PER_VIEW;

  const handleScrollLayout = () => {
    const currentMonth = new Date().getMonth(); // 0..11
    if (currentMonth <= 5) {
      scrollViewRef.current?.scrollTo({ x: 0, animated: false });
    } else {
      scrollViewRef.current?.scrollTo({
        x: initialScrollOffset,
        animated: false,
      });
    }
  };

  return (
    
    <View
      style={[
        styles.chartContainer,
        { width: chartWidth, marginHorizontal: HORIZONTAL_MARGIN },
      ]}
    >
      <ScrollView
        ref={scrollViewRef}
        onLayout={handleScrollLayout}
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator
        contentContainerStyle={{ width: contentWidth }}
      >
        <View style={[styles.barsWrapper, { height: 180 }]}>
          {financialData.map((item, index) => (
            <View
              key={`${item.month}-${index}`}
              style={[styles.barItem, { width: computedColumnWidth }]}
            >
              <View style={[styles.stackedBar, { justifyContent: "flex-end" }]}>
                {FINANCIAL_ITEMS.map((itemType) => {
                  const height =
                    (item[itemType.key] / MAX_DATA_VALUE) * PLOT_AREA_HEIGHT;
                  return (
                    <View
                      key={itemType.key}
                      style={{ height, backgroundColor: itemType.color }}
                    />
                  );
                })}
              </View>

              <Text style={styles.monthLabel}>{item.month}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      < CadeStatic />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    paddingVertical: 10,
    borderRadius: 20,
    position: "relative",
    minHeight: PLOT_AREA_HEIGHT + 70,
    justifyContent: "flex-end",
    borderWidth: 2,
    borderColor: "#363741",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barsWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 5,
  },
  barItem: {
    alignItems: "center",
  },
  stackedBar: {
    width: "60%",
    borderRadius: 20,
    overflow: "hidden",
  },
  monthLabel: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  baseLine: {
    height: 2,
    backgroundColor: "#FFF",
  },
});

export default CustomBarChart;
