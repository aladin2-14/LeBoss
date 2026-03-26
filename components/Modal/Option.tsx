import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (source: "investissement" | "epargne" | "credit") => void;
}

export default function SourceModal({ visible, onClose, onSelect }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Choisir la source</Text>

          <Pressable
            style={styles.button}
            onPress={() => onSelect("investissement")}
          >
            <Text>Investissement</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => onSelect("epargne")}>
            <Text>Epargne</Text>
          </Pressable>

          <Pressable style={styles.button} onPress={() => onSelect("credit")}>
            <Text>Reste (crédit)</Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text style={styles.cancel}>Annuler</Text>
          </Pressable>
        </View>
      </View>
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
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    padding: 12,
    backgroundColor: "#eee",
    marginVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  cancel: {
    marginTop: 10,
    textAlign: "center",
    color: "red",
  },
});
