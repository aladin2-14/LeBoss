import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { financialDataWithPercent, FinancialMonthWithPercentage } from "../data";

export default function CadeStatistique() {
  // Obtenir le mois actuel
  const now = new Date();
  const currentMonthIndex = now.getMonth(); // 0 = Janvier, 11 = Décembre
  const moisData: FinancialMonthWithPercentage = financialDataWithPercent[currentMonthIndex];

  // Gestion du cas où le revenu est 0
  if (!moisData || moisData.revenu === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.mois}>{moisData?.month ?? "Mois inconnu"}</Text>
        <Text style={styles.total}>Pas de données ce mois-ci</Text>
      </View>
    );
  }

  const categories = [
    { label: "Revenu", value: moisData.revenuPercent, color: "#4CAF50" },
    { label: "Épargne", value: moisData.epargnePercent, color: "#2196F3" },
    { label: "Dépense", value: moisData.depensePercent, color: "#FF5722" },
    { label: "Investissement", value: moisData.investissementPercent, color: "#FFC107" },
  ];
console.log("bonjour :", moisData)
  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <Text style={styles.mois}>{moisData.month} :</Text>
        <Text style={styles.total}>{moisData.revenu}M Fbu</Text>
      </View>

      {/* Catégories */}
      {categories.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}%</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1A1A1E",
    padding: 12,
    borderRadius: 12,
    width: 220,
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
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
    marginVertical: 3,
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
