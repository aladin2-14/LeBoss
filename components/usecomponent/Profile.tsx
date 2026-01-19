import { currentUser, getUserFinancialData } from "@/data"; // adapte le chemin si besoin
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileHeader() {
  // 🔹 Données financières du user courant
  const financialData = getUserFinancialData();

  // 🔹 On prend le dernier mois (ex: mois actuel)
  const currentMonth = financialData[financialData.length - 1];

  const balance = currentMonth?.revenu ?? 0;

  // 🔹 Séparer prénom / nom si possible
  const nameParts = currentUser.name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <View style={styles.container}>
      {/* Ligne profil */}
      <View style={styles.row}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />

        <View style={styles.textContainer}>
          <Text style={styles.name}>{firstName}</Text>
          <Text style={styles.subName}>{lastName}</Text>
        </View>

        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name="logout" size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Solde */}
      <View style={styles.balanceBox}>
        <Text style={styles.balanceText}>
          {balance.toLocaleString("fr-FR")} Fbu
        </Text>
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

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  textContainer: {
    // flex: 1,
    // marginLeft: 12,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },

  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },

  subName: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 2,
  },

  actionBtn: {
    backgroundColor: "#FACC15",
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  arrow: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },

  balanceBox: {
    alignSelf: "center",
    marginTop: 18,
    backgroundColor: "#1E3A8A",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 28,
  },

  balanceText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});
