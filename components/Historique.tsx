import Bhistorique from "@/components/ButtonHistorique";
import { getUserGoals, MonthlyGoal } from "@/data";
import React, { useState } from "react";
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
  const goals: MonthlyGoal[] = getUserGoals();

  const [activeMonth, setActiveMonth] = useState<string | null>(null);

  // Récupérer les mois uniques
  const months = [...new Set(goals.map((g) => g.month))];

  return (
    <View
      style={[styles.container, { width: width * 0.95, height: height * 0.41 }]}
    >
      {/* BARRE DES MOIS */}
      <View style={styles.monthBar}>
        {months.map((month, index) => {
          const letter = month.charAt(0).toUpperCase();
          const isActive = activeMonth === month;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveMonth(isActive ? null : month)}
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

      {/* HISTORIQUE */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.historiqueWrapper}>
          <Bhistorique />
        </View>
        {goals
          .filter((g) => !activeMonth || g.month === activeMonth)
          .map((goal, index) => (
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
          ))}
      </ScrollView>
    </View>
  );
}

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
    gap: 2,
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
});
