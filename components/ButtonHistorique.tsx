import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AjoutObjectif() {
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    console.log("Objectif:", description);
    setDescription("");
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* 🔘 Bouton ouvrir modal */}
      <Pressable style={styles.openButton} onPress={() => setVisible(true)}>
        <Text style={styles.openButtonText}>Ajouter un objectif</Text>
      </Pressable>

      {/* 🪟 Modal */}
      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.title}>Nouvel objectif</Text>

            {/* 📝 Champ description */}
            <TextInput
              style={styles.input}
              placeholder="Décris ton objectif ici..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />

            {/* 🔘 Bouton créer */}
            <Pressable style={styles.createButton} onPress={handleCreate}>
              <Text style={styles.createButtonText}>Créer</Text>
            </Pressable>

            {/* ❌ Fermer */}
            <Pressable onPress={() => setVisible(false)}>
              <Text style={styles.cancelText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingBottom: 4,
  },

  openButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
  },

  openButtonText: {
    color: "#0C0C1D",
    fontWeight: "700",
    fontSize: 16,
  },

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
    minHeight: 200,
    textAlignVertical: "top",
  },

  createButton: {
    backgroundColor: "#FFD700",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  createButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },

  cancelText: {
    color: "#AAA",
    borderWidth: 2,
    borderColor: "#D1D1D1",
    textAlign: "center",
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
});
