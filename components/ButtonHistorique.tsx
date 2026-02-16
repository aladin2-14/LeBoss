import { currentUser, MonthlyGoal, MONTHS, STORAGE_KEYS } from "@/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";

export default function AjoutObjectif({ monthIndex }: { monthIndex: number }) {
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleCreate = async () => {
    if (!title || !description) return;

    const newGoal: MonthlyGoal = {
      userId: currentUser.id,
      month: MONTHS[monthIndex],
      title,
      description,
      status: "in-progress",
    };

    console.log("🟢 Création d'objectif:", newGoal);

    const stored = await AsyncStorage.getItem(STORAGE_KEYS.GOALS);
    const goals: MonthlyGoal[] = stored ? JSON.parse(stored) : [];

    goals.push(newGoal);
    await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));

    setTitle("");
    setDescription("");
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.openButton} onPress={() => setVisible(true)}>
        <Text style={styles.openButtonText}>Ajouter un objectif</Text>
      </Pressable>

      <Modal visible={visible} animationType="slide" transparent>
        {/* Fond semi-transparent qui ferme le modal au clic */}
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          {/* Contenu du modal : on empêche la propagation du clic */}
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalBox}>
              <Text style={styles.title}>Nouvel objectif</Text>

              <TextInput
                style={styles.input}
                placeholder="Titre de l'objectif"
                placeholderTextColor="#999"
                value={title}
                onChangeText={setTitle}
              />

              <TextInput
                style={styles.input}
                placeholder="Décris ton objectif ici..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />

              <Pressable style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createButtonText}>Créer</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingBottom: 4 },
  openButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  openButtonText: { color: "#0C0C1D", fontWeight: "700", fontSize: 16 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#1E1E1E",
    borderRadius: 20,
    padding: 20,
  },
  title: { color: "#FFF", fontSize: 18, fontWeight: "700", marginBottom: 14 },
  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 12,
    color: "#FFF",
    minHeight: 50,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: "#FFD700",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  createButtonText: { color: "#101C36", fontWeight: "700", fontSize: 16 },
});
