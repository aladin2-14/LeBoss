import { currentUser, MonthlyGoal, MONTHS, STORAGE_KEYS } from "@/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type Props = {
  monthIndex: number;
  visible: boolean;
  onClose: () => void;
  goalToEdit?: MonthlyGoal | null; // 🔥 pour modification
  onSaved?: () => void; // 🔥 refresh
};

export default function AjoutObjectif({
  monthIndex,
  visible,
  onClose,
  goalToEdit,
  onSaved,
}: Props) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  // 🔥 Pré-remplir si modification
  useEffect(() => {
    if (goalToEdit) {
      setTitle(goalToEdit.title);
      setDescription(goalToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [goalToEdit, visible]);

  const handleSave = async () => {
    if (!title || !description) return;

    const stored = await AsyncStorage.getItem(STORAGE_KEYS.GOALS);
    let goals: MonthlyGoal[] = stored ? JSON.parse(stored) : [];

    // =========================
    // ✏️ MODE MODIFICATION
    // =========================
    if (goalToEdit) {
      const updatedData = goals.map((item) => {
        if (item.idhistorique === goalToEdit.idhistorique) {
          return {
            ...item,
            title,
            description,
          };
        }
        return item;
      });

      await AsyncStorage.setItem(
        STORAGE_KEYS.GOALS,
        JSON.stringify(updatedData)
      );
    }
    // =========================
    // ➕ MODE CREATION
    // =========================
    else {
      const newGoal: MonthlyGoal = {
        idhistorique: Date.now().toString(),
        userId: currentUser.id,
        month: MONTHS[monthIndex],
        title,
        description,
        status: "in-progress",
      };

      goals.push(newGoal);

      await AsyncStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
    }

    // 🔥 reset
    setTitle("");
    setDescription("");
    onClose();
    onSaved && onSaved();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <Pressable style={styles.overlay} onPress={onClose}>
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>
              {goalToEdit ? "Modifier objectif" : "Nouvel objectif"}
            </Text>

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

            <Pressable style={styles.createButton} onPress={handleSave}>
              <Text style={styles.createButtonText}>
                {goalToEdit ? "Enregistrer" : "Créer"}
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  title: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
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
  createButtonText: {
    color: "#101C36",
    fontWeight: "700",
    fontSize: 16,
  },
});
