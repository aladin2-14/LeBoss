import { depenses } from "@/data";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

const { width } = Dimensions.get("window");
const size = 110; // taille du cercle
const strokeWidth = 20;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

export default function BudgetUtilise() {
  const total = depenses.reduce((sum, d) => sum + d.montant, 0);

  // Tri décroissant pour trouver le composant le plus élevé
  const maxDepense = depenses.reduce((prev, current) =>
    current.montant > prev.montant ? current : prev
  );

  // Pour chaque dépense on calcule l'offset du cercle
  let cumulativePercent = 0;
  const segments = depenses.map((d) => {
    const percent = (d.montant / total) * 100;
    const offset = cumulativePercent;
    cumulativePercent += percent;
    return {
      ...d,
      percent,
      offset,
    };
  });

  const maxPercent = Math.round((maxDepense.montant / total) * 100);

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
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${(seg.percent / 100) * circumference} ${circumference}`}
                  strokeDashoffset={-(seg.offset / 100) * circumference}
                  fill="transparent"
                  strokeLinecap="butt"
                />
              ))}
            </G>
          </Svg>
          <View style={styles.centerText}>
            <Text style={styles.percent}>{maxPercent}%</Text>
            <Text style={styles.label}>{maxDepense.categorie}</Text>
          </View>
        </View>

        {/* ================= LISTE ================= */}
        <View style={styles.list}>
          {depenses.map((item, index) => {
            const percent = Math.round((item.montant / total) * 100);

            return (
              <View key={index} style={styles.row}>
                <View style={styles.rowHeader}>
                  <Text style={styles.label}>{item.categorie}</Text>
                  <Text style={styles.value}>{percent}%</Text>
                </View>

                <View style={styles.progressBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${percent}%`,
                        backgroundColor: item.color,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
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

  circle: {
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
