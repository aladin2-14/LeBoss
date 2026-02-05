import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Raisonne() {
  const [raisonnement, setRaisonnement] = useState("");

  const handleSubmit = () => {
    if (!raisonnement.trim()) return;

    console.log("Objectif envoyé :", raisonnement);

    // Plus tard : API / stockage local
    // setRaisonnement("");
  };

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
        {/* 📝 Input objectif */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Exprime comment tu veux gérer ton argent ou ton objectif du mois"
            placeholderTextColor="#888"
            multiline
            textAlignVertical="top"
            style={styles.textInput}
            value={raisonnement}
            onChangeText={setRaisonnement}
          />

          <View style={styles.buttonRow}>
            <Text style={styles.counter}>{raisonnement.length} caractères</Text>

            <Pressable
              onPress={handleSubmit}
              style={[
                styles.sendButton,
                { opacity: raisonnement.trim() ? 1 : 0.4 },
              ]}
            >
              {/* <Text style={styles.sendButtonText}>Enregistrer</Text> */}
              <FontAwesome style={styles.sendButtonText} name="send" size={20} color="black" />
            </Pressable>
          </View>
        </View>

        {/* 🎨 Blocs catégories */}
        <View style={styles.blocksRow}>
          <View style={[styles.block, styles.depense]}>
            <Text style={styles.blockTitle}>Dépense</Text>
            <Text style={styles.item}>• Nourriture</Text>
            <Text style={styles.item}>• Déplacement</Text>
            <Text style={styles.item}>• Maison</Text>
          </View>

          <View style={[styles.block, styles.investissement]}>
            <Text style={styles.blockTitle}>Investissement</Text>
            <Text style={styles.item}>• Agriculture</Text>
            <Text style={styles.item}>• Transport</Text>
            <Text style={styles.item}>• Commerce</Text>
          </View>

          <View style={[styles.block, styles.epargne]}>
            <Text style={styles.blockTitle}>Épargne</Text>
            <Text style={styles.item}>• Banque A</Text>
            <Text style={styles.item}>• Banque B</Text>
            <Text style={styles.item}>• Mobile Money</Text>
          </View>
        </View>

        {/* 📊 Stats statiques */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Objectif</Text>
            <Text style={styles.statValue}>60 %</Text>
            <Text style={styles.depen}>Diminuer</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Objectif</Text>
            <Text style={styles.statValue}>10 %</Text>
            <Text style={styles.invest}>Diminuer</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Objectif</Text>
            <Text style={styles.statValue}>20 %</Text>
            <Text style={styles.epargneText}>Augmentation</Text>
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
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#363741",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 5,
    marginHorizontal: 10,
    borderRadius: 20,
  },

  /* Input */
  inputContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 18,
    padding: 14,
    marginBottom: 24,
    width: "100%",
  },
  textInput: {
    minHeight: 80,
    color: "#FFF",
    fontSize: 14,
    lineHeight: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  sendButton: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#000",

  },

  counter: {
    color: "#888",
    fontSize: 11,
  },

  /* Blocs */
  blocksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
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
    gap: 10,
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

  depen: {
    color: "#FF0000",
    fontSize: 12,
  },
  invest: {
    color: "#FF0000",
    fontSize: 12,
  },
  epargneText: {
    color: "#33C000",
    fontSize: 12,
  },
});
