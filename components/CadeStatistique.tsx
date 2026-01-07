import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { FinancialMonth, getUserFinancialData } from "../data";

type Props = {
  monthIndex: number;
};

export default function CadeStatistique({ monthIndex }: Props) {
  const data = getUserFinancialData();
  const moisData: FinancialMonth | undefined = data[monthIndex];

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [monthIndex]);

  if (!moisData) return null;

  // 🔢 Calcul dynamique des pourcentages
  const revenu = moisData.revenu;
  const depense = moisData.depense;
  const investissement = moisData.investissement;
  const epargne = moisData.epargne;

  const safe = revenu === 0 ? 1 : revenu;

  const revenuPercent = 100;
  const depensePercent = +((depense / safe) * 100).toFixed(1);
  const investissementPercent = +((investissement / safe) * 100).toFixed(1);
  const epargnePercent = +((epargne / safe) * 100).toFixed(1);

  const categories = [
    { label: "Revenu", value: revenuPercent, color: "#4CAF50" },
    { label: "Dépense", value: depensePercent, color: "#FF5722" },
    { label: "Investissement", value: investissementPercent, color: "#FFC107" },
    { label: "Épargne", value: epargnePercent, color: "#2196F3" },
  ];

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: anim,
          transform: [
            {
              translateY: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.mois}>{moisData.month}</Text>
        <Text style={styles.total}>{moisData.revenu} Fbu</Text>
      </View>

      {categories.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}%</Text>
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1E",
    padding: 14,
    borderRadius: 14,
    marginTop: 16,
    marginHorizontal: 9,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  mois: {
    color: "#FFD700",
    fontSize: 15,
    fontWeight: "700",
  },

  total: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 8,
  },

  label: {
    flex: 1,
    color: "#D1D1D1",
    fontSize: 14,
  },

  value: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
