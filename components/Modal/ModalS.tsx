import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
} from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  visible: boolean;
  monthIndex: number;
  solde: number; // solde réel du mois
  onClose: () => void;
  onConfirm: (monthIndex: number, montant: number) => void;
}

export default function ModalS({
  visible,
  monthIndex,
  solde,
  onClose,
  onConfirm,
}: Props) {
  const [montant, setMontant] = useState("");

  const handleConfirm = () => {
    const montantNum = parseFloat(montant);

    // Vérification si montant valide
    if ( montantNum > solde) {
      // 🔹 Toast déclenché si le montant est invalide ou si le montant > solde
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Veuillez saisir un montant valide",
        position: "bottom",
        bottomOffset: 50,
        visibilityTime: 2500,
      });

      // Optionnel : vibration pour alerter l'utilisateur
      Vibration.vibrate(300);

      return; // bloque la suite si erreur
    }

    // Tout va bien → succès
    onConfirm(monthIndex, montantNum);
    Vibration.vibrate(100);

    Toast.show({
      type: "success",
      text1: "Montant retiré",
      text2: `${montantNum.toLocaleString()} FBu`,
      position: "bottom",
      bottomOffset: 50,
      visibilityTime: 2500,
    });

    setMontant("");
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={() => {}}>
          <Text style={styles.title}>Sortir de l'argent</Text>
          <TextInput
            style={styles.input}
            placeholder="Montant"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={montant}
            onChangeText={setMontant}
          />
          <Pressable style={styles.btn} onPress={handleConfirm}>
            <Text style={styles.btnText}>Valider</Text>
          </Pressable>
        </Pressable>
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

  container: {
    width: "90%",
    backgroundColor: "#1E1E1E",
    borderRadius: 22,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#FFF",
    marginBottom: 10,
    borderWidth: 0,
  },

  btn: {
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 14,
    marginTop: 10,
  },

  btnText: {
    color: "#0C0C1D",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
