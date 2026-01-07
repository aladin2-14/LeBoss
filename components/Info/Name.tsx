import { currentUser, financialData, FinancialMonth } from "@/data";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

interface Props {
  objectif: string;
}

export default function ProfileHeader({ objectif }: Props) {
  const { width } = useWindowDimensions(); // 🔥 écoute de la largeur
  const name = currentUser?.name || "U";
  const firstLetter = name.charAt(0).toUpperCase();

  const userData: FinancialMonth[] = financialData.filter(
    (item) => item.userId === currentUser?.id
  );

  const totalRemaining = userData.reduce((acc, item) => {
    const remaining =
      item.revenu - (item.epargne + item.depense + item.investissement);
    return acc + remaining;
  }, 0);

  return (
    <View style={[styles.container, { width: width - 15 }]}>
      {/* width dynamique avec padding 16 à gauche et droite */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.label}>Montant restant</Text>
            <Text style={styles.value}>{totalRemaining}</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.label}>Objectif</Text>
            <Text style={styles.value}>{objectif}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    // padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#222",
    gap: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 8
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    color: "#aaa",
    fontSize: 12,
  },
  value: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
});
