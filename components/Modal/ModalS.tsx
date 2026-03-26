import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

interface Props {
  visible: boolean;
  monthIndex: number;
  solde: number;
  onClose: () => void;
  onConfirm: (
    montant: number,
    source: "depense" | "investissement" | "epargne"
  ) => void;
}

export default function ModalS({ visible, solde, onClose, onConfirm }: Props) {
  const [montant, setMontant] = useState("");
  const [selectedSource, setSelectedSource] = useState<
    "depense" | "investissement" | "epargne"
  >("depense");

  useEffect(() => {
    if (visible) {
      setMontant("");
      setSelectedSource("depense");
    }
  }, [visible]);

  const handleConfirm = () => {
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

    onConfirm(montantNum, selectedSource);
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

          <View style={styles.selectBox}>
            {["depense", "investissement", "epargne"].map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.option,
                  selectedSource === item && styles.optionActive,
                ]}
                onPress={() => setSelectedSource(item as any)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.btn} onPress={handleConfirm}>
            <Text style={styles.btnText}>Enléver</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// Styles inchangés
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
  selectBox: { marginBottom: 10 },
  option: {
    backgroundColor: "#2A2A2A",
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
  },
  optionActive: { borderWidth: 1, borderColor: "#FFD700" },
  optionText: { color: "#FFF" },
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
