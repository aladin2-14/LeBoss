import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
} from "react-native";
import Toast from "react-native-toast-message";
import { sortirArgent } from "../../data";

interface Props {
  visible: boolean;
  monthIndex: number;
  solde: number;
  onClose: () => void;
}

export default function ModalS({ visible, monthIndex, solde, onClose }: Props) {
  const [montant, setMontant] = useState("");
  const [transactions, setTransactions] = useState<{ [key: string]: any[] }>(
    {}
  );

  // 🔹 Charger les transactions depuis AsyncStorage
  useEffect(() => {
    const loadTransactions = async () => {
      const data = await AsyncStorage.getItem("@transactions");
      if (data) {
        setTransactions(JSON.parse(data));
      }
    };
    loadTransactions();
  }, [visible]); // se recharge à chaque ouverture du modal

  const handleConfirm = async () => {
    const montantNum = parseFloat(montant);

    if (isNaN(montantNum) || montantNum <= 0 || montantNum > solde) {
      Toast.show({
        type: "error",
        text1: "Erreur",
        text2: "Veuillez saisir un montant valide",
        position: "bottom",
        bottomOffset: 50,
        visibilityTime: 2500,
      });
      Vibration.vibrate(300);
      return;
    }

    // Appel à ta fonction sortirArgent
    sortirArgent(monthIndex, montantNum);

    // 🔹 Exemple : mettre à jour @transactions si tu veux
    const updated = {
      ...transactions,
      Sortie: transactions["Sortie"]
        ? [
            ...transactions["Sortie"],
            { id: Date.now().toString(), value: montantNum },
          ]
        : [{ id: Date.now().toString(), value: montantNum }],
    };
    setTransactions(updated);
    await AsyncStorage.setItem("@transactions", JSON.stringify(updated));

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
