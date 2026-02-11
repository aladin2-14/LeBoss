import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const { width } = Dimensions.get("window");
const size = 110; // taille du cercle
const strokeWidth = 20;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

type Transaction = { id: string; value: string };

export default function BudgetUtilise() {
  const [depenses, setDepenses] = useState<Transaction[]>([]);

  useEffect(() => {
    loadDepenses();
  }, []);

  const loadDepenses = async () => {
    try {
      const data = await AsyncStorage.getItem("@transactions");
      if (data) {
        const parsed = JSON.parse(data);
        const dep = parsed["Dépense"] || [];
        setDepenses(dep);
      }
    } catch (e) {
      console.error("Erreur lors du chargement des dépenses :", e);
    }
  };

  const total = depenses.reduce((sum, d) => sum + Number(d.value || 0), 0);
  const maxDepense = depenses[0] || { value: "0", id: "0" };

  let cumulativePercent = 0;
  const segments = depenses.map((d) => {
    const percent = 0; // on met 0% comme demandé
    const offset = cumulativePercent;
    cumulativePercent += percent;
    return {
      ...d,
      percent,
      offset,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget utilisé</Text>

      <View style={styles.content}>
        {/* ================= CERCLE ================= */}
        <View style={styles.circleWrapper}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <G rotation="-90" originX={size / 2} originY={size / 2}>
              {segments.map((seg, index) => (
                <Circle
                  key={index}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#FFD700"
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${
                    (seg.percent / 100) * circumference
                  } ${circumference}`}
                  strokeDashoffset={-(seg.offset / 100) * circumference}
                  fill="transparent"
                  strokeLinecap="butt"
                />
              ))}
            </G>
          </Svg>
          <View style={styles.centerText}>
            <Text style={styles.percent}>0%</Text>
            <Text style={styles.label}>Dépenses</Text>
          </View>
        </View>

        {/* ================= LISTE ================= */}
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
                      {
                        width: `0%`,
                        backgroundColor: "#FFD700",
                      },
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

  /* ===== CERCLE ===== */
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

  /* ===== LISTE ===== */
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
