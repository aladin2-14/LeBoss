import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { CalendarList } from "react-native-calendars";

interface Props {
  onClose: () => void;
}

export default function Calender({ onClose }: Props) {
  const today = new Date().toISOString().split("T")[0];

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  // Taille responsive pour le calendrier
  const calendarWidth = screenWidth * 0.9;
  const calendarHeight = screenHeight * 0.4; // une taille réduite pour montrer 1 semaine

  return (
    <View style={styles.overlay}>
      <View
        style={[
          styles.modalContainer,
          { width: calendarWidth, height: calendarHeight },
        ]}
      >
        {/* Bouton rond pour fermer */}
        <Pressable style={styles.closeButton} onPress={onClose}>
          {/* <Ionicons name="close" size={26} color="#1E1E1E" /> */}
          <Text style={{ color: "#1E1E1E", fontWeight: "600", fontSize: 18 }}>
            Fermer
          </Text>
        </Pressable>

        {/* Calendrier centré */}
        <CalendarList
          horizontal
          pagingEnabled
          calendarWidth={calendarWidth}
          pastScrollRange={12}
          futureScrollRange={12}
          scrollEnabled
          showScrollIndicator={false}
          firstDay={1} // lundi = 1
          theme={{
            backgroundColor: "#1E1E1E",
            calendarBackground: "#1E1E1E",
            monthTextColor: "#FFFFFF",
            textMonthFontSize: 18,
            textMonthFontWeight: "600",
            dayTextColor: "#FFFFFF",
            textDisabledColor: "#555555",
            todayTextColor: "#FFD700",
            arrowColor: "#FFFFFF",
            textDayFontSize: 15,
            textDayHeaderFontSize: 12,
            textSectionTitleColor: "#777777",
          }}
          markedDates={{
            [today]: { marked: true, dotColor: "#FFD700" },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 12,
    overflow: "hidden",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    bottom: 6,
    right: 110,
    backgroundColor: "#FFD700",
    borderRadius: 25,
    padding: 8,
    paddingHorizontal: 43,
    zIndex: 10,
  },
});
