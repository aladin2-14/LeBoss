import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Raisonne() {
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 📝 Input objectif du mois */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Exprime comment tu veux gérer ton argent ou ton objectif du mois"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
            style={styles.textInput}
          />
        </View>

        {/* 🎨 Blocs catégories */}
        <View style={styles.blocksRow}>
          {/* Dépense */}
          <View style={[styles.block, styles.depense]}>
            <Text style={styles.blockTitle}>Dépense</Text>
            <Text style={styles.item}>• Nourriture</Text>
            <Text style={styles.item}>• Déplacement</Text>
            <Text style={styles.item}>• Maison</Text>
          </View>

          {/* Investissement */}
          <View style={[styles.block, styles.investissement]}>
            <Text style={styles.blockTitle}>Investissement</Text>
            <Text style={styles.item}>• Agriculture</Text>
            <Text style={styles.item}>• Transport</Text>
            <Text style={styles.item}>• Commerce</Text>
          </View>

          {/* Épargne */}
          <View style={[styles.block, styles.epargne]}>
            <Text style={styles.blockTitle}>Épargne</Text>
            <Text style={styles.item}>• Banque A</Text>
            <Text style={styles.item}>• Banque B</Text>
            <Text style={styles.item}>• Mobile Money</Text>
          </View>
        </View>

        {/* 📊 Stats (statique) */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Objectif</Text>
            <Text style={styles.statValue}>60 %</Text>
            <Text style={styles.statDesc}>Dépense</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Objectif</Text>
            <Text style={styles.statValue}>10 %</Text>
            <Text style={styles.statDesc}>Investissement</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Objectif</Text>
            <Text style={styles.statValue}>20 %</Text>
            <Text style={styles.statDesc}>Épargne</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
  
    container: {
      padding: 16,
      paddingBottom: 40,
    },
  
    /* Input */
    inputContainer: {
      backgroundColor: "#1E1E1E",
      borderRadius: 18,
      padding: 14,
      marginBottom: 24,
    },
    textInput: {
      minHeight: 100,
      color: "#FFF",
      fontSize: 14,
      lineHeight: 20,
    },
  
    /* Blocs */
    blocksRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 28,
    },
    block: {
      width: "31%",
      borderRadius: 20,
      padding: 14,
    },
    blockTitle: {
      color: "#FFF",
      fontWeight: "700",
      marginBottom: 12,
      fontSize: 14,
    },
    item: {
      color: "#EEE",
      fontSize: 12,
      marginBottom: 8,
    },
  
    depense: {
      backgroundColor: "#8B2E13",
    },
    investissement: {
      backgroundColor: "#8A7200",
    },
    epargne: {
      backgroundColor: "#0F4C75",
    },
  
    /* Stats */
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    statBox: {
      width: "31%",
      alignItems: "center",
    },
    statLabel: {
      color: "#AAA",
      fontSize: 12,
    },
    statValue: {
      color: "#FFD700",
      fontSize: 22,
      fontWeight: "800",
      marginVertical: 6,
    },
    statDesc: {
      color: "#FFF",
      fontSize: 12,
    },
  });
  