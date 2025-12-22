import { LucideSearch } from "@/components/Icons/LucideSearch";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Historique() {
  return (
    <View style={styles.container}>
      {/* ===== HEADER FIXE ===== */}
      <View style={styles.header}>
        <TextInput
          placeholder="Recherche dans l'historique"
          placeholderTextColor="#777"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button}>
          {/* <Text style={styles.buttonText}>Filtre</Text> */}
          <LucideSearch size={22} color="#777" />{" "}
        </TouchableOpacity>
      </View>

      {/* ===== CONTENU SCROLLABLE ===== */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>Historique {index + 1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 420,
    height: 370,
    backgroundColor: "#0C0C1D",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
  },

  /* ===== HEADER ===== */
  header: {
    flexDirection: "row",
    padding: 12,
    gap: 10,
    backgroundColor: "#0C0C1D",
    zIndex: 10,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: "#444",
    backgroundColor: "#0C0C1D",
    color: "#fff",
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#f5c400",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#0C0C1D",
    fontWeight: "bold",
  },

  /* ===== SCROLLABLE ===== */
  content: {
    flex: 1,
    padding: 12,
  },

  item: {
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#0C0C1D",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#222",
  },

  itemText: {
    color: "#fff",
  },
});
