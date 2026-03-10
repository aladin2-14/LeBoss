import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [selectedDepense, setSelectedDepense] = useState<string | null>(null);

  // Charger les dépenses existantes depuis @transactions
  useEffect(() => {
    const loadTransactions = async () => {
      const data = await AsyncStorage.getItem("@transactions");
      if (data) {
        setTransactions(JSON.parse(data));
      }
      setMontant("");
      setSelectedDepense(null);
    };

    if (visible) {
      loadTransactions();
    }
  }, [visible]);

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

    // Enregistrer uniquement dans @depensedata
    const depenseDataRaw = await AsyncStorage.getItem("@depensedata");
    const depenseData = depenseDataRaw ? JSON.parse(depenseDataRaw) : {};

    const updatedDepense = {
      ...depenseData,
      [monthIndex]: depenseData[monthIndex]
        ? [
            ...depenseData[monthIndex],
            {
              id: Date.now().toString(),
              value: montantNum,
              label: selectedDepense,
              moi : "un"
            },
          ]
        : [
            {
              id: Date.now().toString(),
              value: montantNum,
              label: selectedDepense,
              moi : "deux"
            },
          ],
    };

    await AsyncStorage.setItem("@depensedata", JSON.stringify(updatedDepense));
    console.log("📦 @depensedata:", JSON.stringify(updatedDepense, null, 2));

    // Déclencher la logique de retrait
    sortirArgent(monthIndex, montantNum);

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
    setSelectedDepense(null);
    onClose();
  };

  // Affichage des dépenses existantes depuis @transactions
  const depenses = transactions["Dépense"] || [];

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

          {/* affichage direct des dépenses */}
          <View style={styles.selectBox}>
            {depenses.map((item) => (
              <Pressable
                key={item.id}
                style={[
                  styles.option,
                  selectedDepense === item.value && styles.optionActive,
                ]}
                onPress={() => setSelectedDepense(item.value)}
              >
                <Text style={styles.optionText}>{item.value}</Text>
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

  selectBox: {
    marginBottom: 10,
  },

  option: {
    backgroundColor: "#2A2A2A",
    padding: 12,
    borderRadius: 10,
    marginBottom: 6,
  },

  optionActive: {
    borderWidth: 1,
    borderColor: "#FFD700",
  },

  optionText: {
    color: "#FFF",
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
