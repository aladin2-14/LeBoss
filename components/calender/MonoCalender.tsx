import Calender from "@/components/calender/Calender";
import React, { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function MonoCalendar() {
  const [modalVisible, setModalVisible] = useState(false);

  const today = new Date();

  // 📅 Mois actuel (ex: Février 2026)
  const monthLabel = today.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  // 📅 Semaine actuelle (lundi → dimanche)
  const weekDays = useMemo(() => {
    const day = today.getDay() === 0 ? 7 : today.getDay(); // dimanche = 7
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day - 1));

    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      return {
        label: date.toLocaleDateString("fr-FR", { weekday: "short" }),
        day: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* 🟡 Mois actuel (cliquable) */}
      <Pressable
        style={styles.monthButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.monthText}>{monthLabel}</Text>
      </Pressable>

      {/* 📆 Semaine actuelle */}
      <View style={styles.weekRow}>
        {weekDays.map((item, index) => (
          <View
            key={index}
            style={[styles.dayItem, item.isToday && styles.todayItem]}
          >
            <Text style={[styles.dayLabel, item.isToday && styles.todayText]}>
              {item.label}
            </Text>
            <Text style={[styles.dayNumber, item.isToday && styles.todayText]}>
              {item.day}
            </Text>
          </View>
        ))}
      </View>

      {/* 📦 Modal calendrier (inchangée) */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Calender onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#363741",
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 8,
    marginTop: 5,
    marginHorizontal: -10 ,
    borderRadius: 20,
  },

  monthButton: {
    backgroundColor: "#1E1E1E",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginBottom: 12,
  },
  monthText: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "capitalize",
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  dayItem: {
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  dayLabel: {
    color: "#777",
    fontSize: 12,
    textTransform: "capitalize",
  },
  dayNumber: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  todayItem: {
    backgroundColor: "#FFD700",
  },
  todayText: {
    color: "#000",
  },
});
