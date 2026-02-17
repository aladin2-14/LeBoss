import Bhistorique from "@/components/ButtonHistorique";
import { getUserGoals, MonthlyGoal, MONTHS } from "@/data";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function Historique() {
  const { width, height } = useWindowDimensions();

  // 📌 Mois actuel par défaut
  const currentMonthIndex = new Date().getMonth();

  const [goals, setGoals] = useState<MonthlyGoal[]>([]);
  const [activeMonthIndex, setActiveMonthIndex] =
    useState<number>(currentMonthIndex);

  // 🔥 Charger les objectifs du mois actuel au démarrage
  useEffect(() => {
    loadGoals(currentMonthIndex);
  }, []);

  const loadGoals = async (monthIndex: number) => {
    const data = await getUserGoals(monthIndex);
    setGoals(data);
  };

  // 📌 Quand on clique sur un mois
  const handleMonthPress = async (index: number) => {
    console.log("🟢 Mois cliqué :", MONTHS[index], "==", index);
    setActiveMonthIndex(index);
    await loadGoals(index);
  };

  return (
    <View
      style={[styles.container, { width: width * 0.95, height: height * 0.41 }]}
    >
      {/* ========================= */}
      {/* 🟡 BARRE DES MOIS */}
      {/* ========================= */}
      <View style={styles.monthBar}>
        {MONTHS.map((month, index) => {
          const letter = month.charAt(0).toUpperCase();
          const isActive = activeMonthIndex === index;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleMonthPress(index)}
              style={[styles.monthItem, isActive && styles.monthItemActive]}
            >
              <Text
                style={[
                  styles.monthLetter,
                  isActive && styles.monthLetterActive,
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* ========================= */}
      {/* 🟡 HISTORIQUE + BOUTON */}
      {/* ========================= */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.historiqueWrapper}>
          <Bhistorique monthIndex={activeMonthIndex} />
        </View>
        {goals.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aucun historique pour le mois de {MONTHS[activeMonthIndex]}.
            </Text>
          </View>
        ) : (
          goals.map((goal, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.month}>{goal.month}</Text>
              <Text style={styles.title}>{goal.title}</Text>
              <Text style={styles.desc}>{goal.description}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      goal.status === "achieved"
                        ? "#4CAF50"
                        : goal.status === "in-progress"
                        ? "#FFC107"
                        : "#FF5252",
                  },
                ]}
              >
                {goal.status === "achieved"
                  ? "Objectif atteint"
                  : goal.status === "in-progress"
                  ? "En cours"
                  : "Non atteint"}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// ===============================
// 🎨 STYLES
// ===============================
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0C0C1D",
    borderRadius: 20,
    borderWidth: 1.6,
    borderColor: "#363741",
    overflow: "hidden",
  },
  historiqueWrapper: {
    alignItems: "flex-end",
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  monthBar: {
    flexDirection: "row",
    gap: 2,
    padding: 12,
  },
  monthItem: {
    flex: 1,
    height: 38,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#363741",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0C0C1D",
  },
  monthItemActive: {
    backgroundColor: "#f5c400",
    borderColor: "#f5c400",
  },
  monthLetter: {
    color: "#f5c400",
    fontWeight: "bold",
  },
  monthLetterActive: {
    color: "#0C0C1D",
  },
  content: {
    paddingTop: 5,
    paddingHorizontal: 12,
    paddingBottom: 6,
  },
  item: {
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#0C0C1D",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222",
  },
  month: {
    color: "#aaa",
    fontSize: 12,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
  },
  desc: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 4,
  },
  status: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    width: "100%", // pour s’assurer que le texte prend toute la largeur
  },
  emptyText: {
    color: "#888",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center", // centre le texte
    flexWrap: "wrap",    // autorise le retour à la ligne
    width: "90%",        // pour limiter la largeur à 90% de la zone parent
  },
  
});
