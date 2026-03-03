import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

type Transaction = { id: string; value: string };

type Props = {
  transactions: { [key: string]: Transaction[] };
};

const size = 110;
const strokeWidth = 20;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

export default function BudgetUtilise({ transactions }: Props) {
  const depenses = transactions["Dépense"] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget utilisé</Text>

      <View style={styles.content}>
        <View style={styles.circleWrapper}>
          <Svg width={size} height={size}>
            <G rotation="-90" originX={size / 2} originY={size / 2}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#FFD700"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
            </G>
          </Svg>
          <View style={styles.centerText}>
            <Text style={styles.percent}>0%</Text>
            <Text style={styles.label}>Dépenses</Text>
          </View>
        </View>

        <View style={styles.list}>
          {depenses.length === 0 ? (
            <Text style={{ color: "#9CA3AF" }}>Aucune dépense ajoutée</Text>
          ) : (
            depenses.map((item) => (
              <View key={item.id} style={styles.row}>
                <View style={styles.rowHeader}>
                  <Text style={styles.label}>{item.value}</Text>
                  <Text style={styles.value}>0%</Text>
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `0%`, backgroundColor: "#FFD700" },
                    ]}
                  />
                </View>
              </View>
            ))
          )}
        </View>
      </View>
    </View>
  );
}

/* 🔹 Styles inchangés */
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#363741",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
    marginHorizontal: 12,
    marginTop: 20,
    borderRadius: 20,
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleWrapper: {
    width: size,
    height: size,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  centerText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  percent: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  label: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },
  list: {
    flex: 1,
  },
  row: {
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  progressBg: {
    height: 6,
    backgroundColor: "#1F2937",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
});
