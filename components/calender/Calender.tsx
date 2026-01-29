import React from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";

export default function NbaCalendar() {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  return (
    <View style={styles.container}>
      <CalendarList
        pastScrollRange={12}
        futureScrollRange={12}
        scrollEnabled
        showScrollIndicator={false}
        markingType="custom"
        theme={{
          backgroundColor: "#000000",
          calendarBackground: "#000000",

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
          [today]: {
            marked: true,
            dotColor: "#FFD700",
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
